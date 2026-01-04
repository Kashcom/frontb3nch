'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    return (
        <div className="min-h-screen pt-4 pb-20 px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-2">Manage your preferences and account settings</p>
                </header>

                <div className="space-y-6">
                    <Section title="Account">
                        <SettingItem title="Username" value="Guest User" action="Edit" />
                        <SettingItem title="Email" value="guest@frontb3nch.app" action="Change" />
                    </Section>

                    <Section title="Preferences">
                        <ToggleItem title="Dark Mode" description="Use dark theme across the app" enabled={true} />
                        <ToggleItem title="Sound Effects" description="Play sounds during quizzes" enabled={true} />
                        <ToggleItem title="Background Animations" description="Show animated star background" enabled={true} />
                    </Section>

                    <Section title="Data & Privacy">
                        <SettingItem title="Clear History" description="Delete all your past quiz records" action="Clear" danger />
                        <SettingItem title="Export Data" description="Download a copy of your data" action="Export" />
                    </Section>

                    <div className="pt-6">
                        <button className="w-full rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-sm font-bold text-red-500 hover:bg-red-500/20 transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
    >
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">{title}</h2>
        </div>
        <div className="divide-y divide-white/5">
            {children}
        </div>
    </motion.div>
);

const SettingItem = ({ title, value, description, action, danger }: { title: string; value?: string; description?: string; action: string; danger?: boolean }) => (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
        <div>
            <p className="text-sm font-medium text-white">{title}</p>
            {value && <p className="text-sm text-gray-500 mt-0.5">{value}</p>}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
        <button className={`text-sm font-semibold hover:underline ${danger ? 'text-red-500' : 'text-gray-300'}`}>
            {action}
        </button>
    </div>
);

const ToggleItem = ({ title, description, enabled }: { title: string; description: string; enabled: boolean }) => (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
        <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <div className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? 'bg-zinc-600' : 'bg-zinc-800'}`}>
            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
    </div>
);
