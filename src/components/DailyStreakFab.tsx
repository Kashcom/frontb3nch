'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';

const DailyStreakFab = () => {
    const { user, claimDailyBonus } = useUser();
    const [showTooltip, setShowTooltip] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (user.hasClaimedToday) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000); // Disappear after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [user.hasClaimedToday]);

    const handleClaim = () => {
        if (user.hasClaimedToday || isClaiming) return;

        setIsClaiming(true);
        setTimeout(() => {
            // Delay actual claim slightly for animation
            claimDailyBonus();
            setIsClaiming(false);
        }, 800);
    };

    if (!isVisible) return null;

    if (user.hasClaimedToday) {
        // Optional: Don't show if claimed, or show a 'checked' state. 
        // For now, let's keep it visible but disabled/checked to show off the streak.
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
                    className="fixed bottom-8 right-8 z-40 group"
                >
                    <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-zinc-900 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <div className="text-2xl">🔥</div>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full border border-black shadow-lg">
                            {user.streak}
                        </div>

                        {/* Tooltip for claimed state */}
                        <div className="absolute bottom-full right-0 mb-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-xs text-green-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Streak Saved! See you tomorrow.
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="fixed bottom-8 right-8 z-40">
            <AnimatePresence>
                {isClaiming && (
                    <motion.div
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], rotate: 0, opacity: 1 }}
                        exit={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <div className="text-6xl filter drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]">
                            ✨
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rotating Sun Rays (Background) */}
            <motion.div
                className="absolute -inset-8 rounded-full z-[-10]"
                style={{
                    background: "repeating-conic-gradient(from 0deg, rgba(250, 204, 21, 0.3) 0deg 15deg, transparent 15deg 30deg)",
                    maskImage: "radial-gradient(circle, black 40%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 70%)"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
            </motion.div>

            <motion.button
                onClick={handleClaim}
                onHoverStart={() => setShowTooltip(true)}
                onHoverEnd={() => setShowTooltip(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_25px_rgba(234,179,8,0.6)] border-2 border-white/20"
            >
                <span className="text-3xl filter drop-shadow-md">🎁</span>

                {/* Streak Badge (if existing streak > 0) */}
                {user.streak > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-black shadow-lg">
                        {user.streak}
                    </div>
                )}
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-black/90 backdrop-blur-md rounded-xl border border-yellow-500/30 text-sm font-bold text-yellow-400 whitespace-nowrap shadow-xl"
                    >
                        Claim your streak! (+200 XP)
                        <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-black/90 border-r border-b border-yellow-500/30 rotate-45 transform" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DailyStreakFab;
