const DATA_URL_REGEX = /^data:(?<mime>[\w/+.-]+);base64,(?<data>.+)$/;
const MAX_CHARS = 24000;

export const dataUrlToBuffer = (dataUrl: string) => {
  const match = dataUrl.match(DATA_URL_REGEX);
  if (!match || !match.groups?.data) {
    throw new Error('Invalid data URL supplied');
  }
  return Buffer.from(match.groups.data, 'base64');
};

export const sanitizePdfText = (input: string, limit = MAX_CHARS) => {
  if (!input) return '';
  const collapsed = input.replace(/\r/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]+/g, ' ');
  const normalized = collapsed
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
  return normalized.slice(0, limit);
};

export const chunkForPrompt = (input: string, chunkSize = 1800) => {
  if (!input) return [];
  const sentences = input.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = '';
  sentences.forEach((sentence) => {
    if ((current + ' ' + sentence).length > chunkSize) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  });
  if (current) chunks.push(current.trim());
  return chunks;
};

