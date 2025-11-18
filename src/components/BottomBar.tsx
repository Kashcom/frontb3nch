'use client';

import { motion } from 'framer-motion';

const BottomBar = () => (
  <div className="flex justify-center px-4 pb-12">
    <motion.div
      className="flex w-full max-w-xs items-center justify-between gap-3 rounded-full bg-emerald-600 px-5 py-3 text-slate-100 shadow-lg sm:max-w-none sm:px-6"
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <span className="text-sm font-semibold">Scroll to explore</span>
      <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
        ↓
      </motion.span>
    </motion.div>
  </div>
);

export default BottomBar;
