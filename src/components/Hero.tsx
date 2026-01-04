'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  loading: () => <div className="flex h-full w-full items-center justify-center text-gray-400">Loading 3D...</div>,
  ssr: false,
});

const Hero = () => (
  <>
    {/* Fullscreen 3D Background - Middle Layer (z-[-10]) */}
    <div className="fixed inset-0 z-[-10] w-full h-full pointer-events-auto">
      <Spline className="w-full h-full" scene="/desktop-hero.splinecode" />
    </div>

    {/* Hero Content - Top Layer (z-10) */}
    {/* pointer-events-none on container allows clicking through to Spline in empty areas */}
    <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center gap-8 px-4 py-12 text-center pointer-events-none sm:gap-12 sm:px-6 sm:py-14 md:flex-row md:py-20 md:text-left">
      <motion.div
        className="flex-1 space-y-6 pointer-events-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl tracking-tight">
          Master any topic with
          <br />
          <span className="text-gray-400">AI-powered</span> study prep
        </h1>
        <p className="mt-4 text-lg text-gray-400 sm:text-xl max-w-lg mx-auto md:mx-0">
          Upload PDFs, get instant quizzes. Track progress, improve continuously.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center md:justify-start">
          <Link
            href="/play/import"
            className="min-h-[48px] rounded-full bg-white px-8 py-3.5 text-center text-base font-bold text-black shadow-lg hover:bg-gray-200 transition-all sm:flex-1 sm:text-lg">
            Start Playing
          </Link>
          <Link
            href="/play/library"
            className="relative h-48 w-full overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 text-base font-semibold text-gray-400 hover:text-white hover:border-gray-600 transition-all sm:flex-1 sm:text-base">
            Browse library
          </Link>
        </div>
      </motion.div>

      {/* Spacer for Right Side - keeps the text to the left on desktop */}
      <div className="hidden md:block md:w-1/2" />
    </section>
  </>
);

export default Hero;
