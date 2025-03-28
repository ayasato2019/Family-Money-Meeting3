// src/hooks/useToggle.ts
import { useState } from 'react';

export const openToggle = () => {
    const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

    const handleToggle = (index: number) => {
        setOpenIndexes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index); // すでに開いていれば閉じる
            } else {
                newSet.add(index); // 開いていなければ開く
            }
            return newSet;
        });
    };

    return { openIndexes, handleToggle };
};
