'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---
const TOP_GAMES = [
    { id: 1, title: 'Neon Racer', color: 'from-blue-500 to-purple-600', emoji: '🏎️', description: 'High speed futuristic racing.' },
    { id: 2, title: 'Cosmic Blast', color: 'from-red-500 to-orange-600', emoji: '🚀', description: 'Defend your base from aliens.' },
    { id: 3, title: 'Cyber Puzzle', color: 'from-green-500 to-emerald-600', emoji: '🧩', description: 'Hack into the mainframe.' },
    { id: 4, title: 'Void Walker', color: 'from-indigo-500 to-violet-600', emoji: '👻', description: 'Explore the unknown void.' },
];

const ALL_GAMES = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 10,
    title: `Game Title ${i + 1}`,
    emoji: ['🎮', '🎯', '🎲', '🕹️', '🎳', '🎨'][i % 6],
    category: ['Action', 'Puzzle', 'Strategy'][i % 3],
    description: 'A fun and engaging game to test your skills.',
    color: 'from-gray-800 to-gray-900'
}));

const FILTERS = ['All', 'Action', 'Puzzle', 'Strategy', 'Multiplayer'];

export default function FunzonePage() {
    const [topGames, setTopGames] = useState(TOP_GAMES);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedGame, setSelectedGame] = useState<any | null>(null);

    // Moves the top card to the bottom
    const handleShuffle = () => {
        setTopGames((prev) => {
            const newOrder = [...prev];
            const first = newOrder.shift();
            if (first) newOrder.push(first);
            return newOrder;
        });
    };

    const handleCardClick = (game: any, isTop: boolean) => {
        if (isTop) {
            setSelectedGame(game);
        } else {
            handleShuffle();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden pb-20 relative font-sans selection:bg-purple-500 selection:text-white">

            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8">

                {/* Header */}
                <header className="mb-12 text-center sm:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                        Funzone
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Top rated games & community favorites.
                    </p>
                </header>

                {/* --- Top Games: Card Stack Section --- */}
                <section className="mb-20 relative min-h-[400px] flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-md h-[400px]">
                        <AnimatePresence mode='popLayout'>
                            {topGames.map((game, index) => {
                                const isTop = index === 0;
                                return (
                                    <motion.div
                                        key={game.id}
                                        layoutId={`card-${game.id}`}
                                        onClick={() => handleCardClick(game, isTop)}
                                        initial={false}
                                        animate={{
                                            scale: 1 - index * 0.05,
                                            y: index * 15,
                                            zIndex: 100 - index,
                                            opacity: 1 - index * 0.2, // Fade out back cards
                                            rotate: index % 2 === 0 ? index * 2 : index * -2, // Slight random rotation
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className={`absolute top-0 inset-x-0 mx-auto w-full h-full rounded-3xl p-8 cursor-pointer shadow-2xl border border-white/10
                                            bg-gradient-to-br ${game.color} overflow-hidden backdrop-blur-md flex flex-col items-center justify-center text-center
                                            ${isTop ? 'hover:scale-[1.02] active:scale-[0.98]' : 'pointer-events-none'}`}
                                        style={{ transformOrigin: 'top center' }}
                                    >

                                        {/* Card Decoration */}
                                        <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                                        {/* Card Content */}
                                        <div className="relative z-10 flex flex-col items-center gap-4">
                                            <div className="text-9xl drop-shadow-2xl filter">{game.emoji}</div>
                                            <div>
                                                <h3 className="text-4xl font-bold text-white drop-shadow-md">{game.title}</h3>
                                                {isTop && (
                                                    <span className="mt-2 inline-block px-3 py-1 bg-black/20 rounded-full text-xs font-medium border border-white/10">
                                                        #{index + 1} Trending
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {isTop && (
                                            <div className="absolute bottom-8 text-white/60 text-sm animate-pulse">
                                                Tap to view details
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Shuffle / Next Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleShuffle}
                            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500">
                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                <path d="M16 21h5v-5" />
                            </svg>
                            Shuffle Deck
                        </button>
                    </div>
                </section>

                {/* --- Search & Filters --- */}
                <section className="mb-8 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>

                        {/* Filter Scroll */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {FILTERS.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border
                                        ${activeFilter === filter
                                            ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/50'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Games Grid --- */}
                <section>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {ALL_GAMES.filter(g => activeFilter === 'All' || g.category === activeFilter).map((game) => (
                            <motion.div
                                key={game.id}
                                onClick={() => setSelectedGame(game)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="group relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all flex flex-col items-center justify-center p-4 hover:bg-white/10"
                            >
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">{game.emoji}</div>
                                <h4 className="text-white font-bold truncate w-full text-center">{game.title}</h4>
                                <p className="text-xs text-gray-400">{game.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>

            {/* --- Game Detail Modal --- */}
            <AnimatePresence>
                {selectedGame && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedGame(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedGame.id}`} // Magical layout transition from card
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            {/* Modal Header/Art */}
                            <div className={`h-48 bg-gradient-to-br ${selectedGame.color || 'from-purple-900 to-black'} flex items-center justify-center`}>
                                <div className="text-9xl drop-shadow-2xl">{selectedGame.emoji}</div>
                                <button
                                    onClick={() => setSelectedGame(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedGame.title}</h2>
                                <p className="text-gray-400 mb-6">{selectedGame.description || "Join the fun and compete with friends in this amazing game."}</p>

                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></svg>
                                        Play Now
                                    </button>
                                    <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                        Create Lobby
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
