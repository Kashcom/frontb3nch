'use client';

import Lottie from 'lottie-react';
import correctAnimation from '@/../public/correct.json' assert { type: 'json' };

const LottieCorrect = () => (
  <div className="pointer-events-none h-32 w-32">
    <Lottie animationData={correctAnimation} loop={false} autoplay />
  </div>
);

export default LottieCorrect;
