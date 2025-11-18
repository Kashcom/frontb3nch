'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TimerBar from '@/components/TimerBar';
import QuestionCard from '@/components/QuestionCard';
import LottieCorrect from '@/components/LottieCorrect';
import LottieWrong from '@/components/LottieWrong';
import { useStore } from '@/lib/store';
import { getDurationForDifficulty } from '@/lib/utils';

const QuizPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string | string[] }>();
  const routeId = useMemo(() => {
    const id = params?.id;
    if (typeof id === 'string') return id;
    if (Array.isArray(id)) return id[0];
    return '';
  }, [params]);
  const { quizId, difficulty, questions, index, actions } = useStore((state) => ({
    quizId: state.quizId,
    difficulty: state.difficulty,
    questions: state.questions,
    index: state.index,
    actions: state.actions,
  }));
  const question = questions[index];
  const duration = getDurationForDifficulty(difficulty);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealCorrect, setRevealCorrect] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    if (!questions.length) {
      router.replace('/play/import');
    }
  }, [questions.length, router]);

  useEffect(() => {
    if (routeId && quizId && routeId !== quizId) {
      router.replace(`/play/quiz/${quizId}`);
    }
  }, [routeId, quizId, router]);

  useEffect(() => {
    if (index >= questions.length && questions.length) {
      router.push('/play/result');
    }
  }, [index, questions.length, router]);

  useEffect(() => {
    setSelected(null);
    setRevealCorrect(false);
    setFeedback(null);
    setTimerKey((key) => key + 1);
  }, [question?.id]);

  const goNext = useCallback(() => {
    actions.nextQuestion();
  }, [actions]);

  const handleChoice = (choice: string) => {
    if (!question || selected) return;
    setSelected(choice);
    const correct = choice === question.correct;
    setFeedback(correct ? 'correct' : 'wrong');
    actions.answer(choice, question.correct);
    if (correct) {
      setTimeout(goNext, 900);
    } else {
      setTimeout(() => setRevealCorrect(true), 800);
      setTimeout(goNext, 1500);
    }
  };

  const handleTimeout = useCallback(() => {
    if (!question || selected) return;
    setSelected('⏰ Time');
    setFeedback('wrong');
    setRevealCorrect(true);
    actions.answer('', question.correct);
    setTimeout(goNext, 1200);
  }, [actions, goNext, question, selected]);

  if (!question) {
    return null;
  }

  return (
    <motion.section
      className="bg-slate-50 px-4 py-8 sm:px-6 sm:py-10"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="sr-only">Quiz in progress</h1>
      <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-6">
        <TimerBar duration={duration} instanceKey={timerKey} onExpire={handleTimeout} />
        <QuestionCard
          item={question}
          index={index}
          total={questions.length}
          selected={selected}
          revealCorrect={revealCorrect}
          onSelect={handleChoice}
        />
        <div className="flex justify-center">
          {feedback === 'correct' && <LottieCorrect />}
          {feedback === 'wrong' && <LottieWrong />}
        </div>
      </div>
    </motion.section>
  );
};

export default QuizPage;
