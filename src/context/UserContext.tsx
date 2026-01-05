'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
    name: string;
    email: string;
    avatar: string | null; // Data URL or path
    banner: string | null; // Data URL or path
    level: number;
    currentExp: number;
    maxExp: number;
    streak: number;
    hasClaimedToday: boolean;
}

interface UserContextType {
    user: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
    addExp: (amount: number) => void;
    claimDailyBonus: () => boolean; // Returns true if successful
}

const defaultUser: UserProfile = {
    name: 'Guest User',
    email: 'guest@frontb3nch.app',
    avatar: null,
    banner: null,
    level: 1,
    currentExp: 350,
    maxExp: 1000,
    streak: 0,
    hasClaimedToday: false,
};

const UserContext = createContext<UserContextType>({
    user: defaultUser,
    updateProfile: () => { },
    addExp: () => { },
    claimDailyBonus: () => false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile>(defaultUser);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setUser((prev) => ({ ...prev, ...updates }));
    };

    const addExp = (amount: number) => {
        setUser((prev) => {
            let newExp = prev.currentExp + amount;
            let newLevel = prev.level;
            let newMaxExp = prev.maxExp;

            // Simple leveling logic for now
            while (newExp >= newMaxExp) {
                newExp -= newMaxExp;
                newLevel++;
                newMaxExp = Math.floor(newMaxExp * 1.2); // Increase requirement by 20%
            }

            return {
                ...prev,
                level: newLevel,
                currentExp: newExp,
                maxExp: newMaxExp,
            };
        });
    };

    const claimDailyBonus = () => {
        if (user.hasClaimedToday) return false;

        const bonusExp = 200; // Fixed bonus + streak multiplier could go here
        addExp(bonusExp);

        setUser(prev => ({
            ...prev,
            streak: prev.streak + 1,
            hasClaimedToday: true
        }));

        return true;
    };

    return (
        <UserContext.Provider value={{ user, updateProfile, addExp, claimDailyBonus }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
