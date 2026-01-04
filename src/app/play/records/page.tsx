'use client';

import React from 'react';
import { motion } from 'framer-motion';

const mockRecords = [
    { id: 1, title: 'Introduction to Physics', score: '85%', date: '2 days ago', status: 'Passed' },
    { id: 2, title: 'World History 101', score: '92%', date: '3 days ago', status: 'Excellent' },
    { id: 3, title: 'Basic Chemistry', score: '60%', date: '1 week ago', status: 'Review Needed' },
    { id: 4, title: 'Calculus I', score: '45%', date: '1 week ago', status: 'Failed' },
    { id: 5, title: 'Literature Review', score: '100%', date: '2 weeks ago', status: 'Perfect' },
];

export default function RecordsPage() {
    return (
        <div className="min-h-screen pt-4 pb-20 px-4 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Records</h1>
                        <p className="text-gray-400 mt-2">History of your quiz performance</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-2xl font-bold text-white">5</p>
                        <p className="text-sm text-gray-500">Total Quizzes</p>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/[0.02] text-gray-400 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Quiz Title</th>
                                    <th className="px-6 py-4">Score</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">{record.title}</td>
                                        <td className="px-6 py-4 text-gray-300">{record.score}</td>
                                        <td className="px-6 py-4 text-gray-500">{record.date}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={record.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-400 hover:text-indigo-300 font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <div className="mt-6 flex justify-center">
                    <button className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Load more records</button>
                </div>
            </div>
        </div>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    if (status === 'Excellent' || status === 'Perfect') colorClass = 'bg-green-500/10 text-green-400 border-green-500/20';
    if (status === 'Review Needed' || status === 'Failed') colorClass = 'bg-red-500/10 text-red-400 border-red-500/20';
    if (status === 'Passed') colorClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';

    return (
        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
            {status}
        </span>
    );
};
