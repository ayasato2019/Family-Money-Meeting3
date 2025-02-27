import React, { ReactNode } from 'react';

export default function BadgeTypes({
    variant,
    budgetControl,
    className,
    ...props
}: {
    variant?: 'need' | 'want' | 'assets' | 'liabilities'; // 必要か浪費か資産か負債か
    className?: string;
    [key: string]: any;  // 他の props を許容
}) {

    // variant に基づく背景色の選択
    let variantClass = '';
    if (variant === 'need') {
        variantClass = 'bg-green border-green';
    } else if (variant === 'want') {
        variantClass = 'bg-orange border-orange';
    } else if (variant === 'assets') {
        variantClass = 'bg-pink border-pink';
    } else if (variant === 'liabilities') {
        variantClass = 'bg-blue border-blue';
    }

    return (
        <div
            {...props}
            className={`inline-flex items-center justify-center h-6 rounded-[12px] border px-2 py-1 break-keep text-xs font-bold text-white uppercase tracking-widest ${variantClass} ${className}`}
        >
            {variant === 'need' ? '必要' : variant === 'want' ? '浪費' : variant === 'assets' ? 'しさん' : 'つかう'}
        </div>
    );
}
