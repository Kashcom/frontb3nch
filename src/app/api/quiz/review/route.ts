import { NextResponse } from 'next/server';
import { SchemaType, type Schema } from '@google/generative-ai';
import { z } from 'zod';
import { getGeminiModel } from '@/lib/ai';

const requestSchema = z.object({
  quizId: z.string().optional(),
  mode: z.string().optional(),
  score: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  responseTimes: z.array(z.number()).optional(),
  wrongQs: z
    .array(
      z.object({
        q: z.string(),
        correct: z.string(),
        user: z.string().optional(),
      })
    )
    .optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const reviewSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    headline: { type: SchemaType.STRING },
    strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    focus: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    actions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
  },
  required: ['headline', 'strengths', 'focus', 'actions'],
};

const describeWrong = (wrongQs: { q: string; correct: string; user?: string }[]) =>
  wrongQs
    .map(
      (item, idx) =>
        `Miss ${idx + 1}: question="${item.q.slice(0, 120)}" · correct="${item.correct}" · user="${item.user ?? 'skipped'}"`
    )
    .join('\n');

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = requestSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
    }
    const { score, total, mode, quizId, responseTimes = [], wrongQs = [], summary, highlights = [] } = parsed.data;

    const percent = Math.round((score / Math.max(total, 1)) * 100);
    const avg = responseTimes.length
      ? (responseTimes.reduce((acc, value) => acc + value, 0) / responseTimes.length).toFixed(1)
      : '0.0';
    const duration = responseTimes.reduce((acc, value) => acc + value, 0).toFixed(1);

    const statsBlock = [
      `Deck: ${quizId ?? 'custom'}`,
      `Mode: ${mode ?? 'normal'}`,
      `Score: ${score}/${total} (${percent}%)`,
      `Avg response: ${avg}s`,
      `Total time: ${duration}s`,
    ].join('\n');

    const mistakeBlock = wrongQs.length ? describeWrong(wrongQs) : 'None';
    const highlightBlock = highlights.length ? highlights.map((item) => `• ${item}`).join('\n') : 'N/A';

    const prompt = [
      'You are an encouraging teaching assistant called ParhaiPlay Coach.',
      'Generate JSON that matches the schema with headline, strengths, focus, and actions.',
      'Strengths should celebrate what went well. Focus should cover no more than 3 gaps. Actions should be specific study ideas.',
      'Limit each bullet to 160 characters and avoid emojis.',
      'Use the supplied stats, mistake log, and optional PDF summary for context.',
    ].join(' ');

    const model = getGeminiModel('gemini-1.5-flash', {
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: reviewSchema,
        temperature: 0.6,
      },
    });

    const promptText = `${prompt}\n\nStats:\n${statsBlock}\n\nMistakes:\n${mistakeBlock}\n\nPDF summary:\n${summary ?? 'N/A'}\n\nHighlights:\n${highlightBlock}`;

    const result = await model.generateContent(promptText);
    const raw = result.response.text();
    if (!raw) {
      return NextResponse.json({ error: 'Gemini returned an empty response' }, { status: 502 });
    }
    const review = JSON.parse(raw);
    return NextResponse.json({ review, generatedAt: Date.now() });
  } catch (error) {
    console.error('review error', error);
    return NextResponse.json({ error: 'Failed to generate AI review' }, { status: 500 });
  }
}

