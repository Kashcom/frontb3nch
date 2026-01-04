'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FunzonePage() {
    return (
        <div className="min-h-screen pt-4 pb-20 px-4 sm:px-6 bg-black">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Funzone</h1>
                    <p className="text-gray-400 mt-2">Explore a collection of mini‑games and interactive quizzes.</p>
                </header>

                {/* Simple horizontal carousel placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 overflow-x-auto pb-4"
                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-64 h-40 rounded-xl border border-white/10 bg-[#0a0a0a] flex items-center justify-center text-white"
                        >
                            Game {i}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
