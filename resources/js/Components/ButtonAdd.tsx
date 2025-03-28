import { ButtonHTMLAttributes } from 'react';

export default function ButtonAdd({
    type = 'button',
    className = '',
    disabled,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `relative inline-flex items-center justify-center w-3 h-5 rounded-[20px] border border-dotted border-purple bg-white px-3 py-2 text-sm font-bold leading-none uppercase tracking-widest text-purple shadow-sm transition duration-150 ease-in-out hover:bg-purple hover:border-purple hover:text-white focus:outline-none hover:text focus:ring-2 focus:ring-purple focus:ring-offset-2 disabled:opacity-25 before:content-["+"] before:absolute before:top-[calc(50%-8px)] before:left-[calc(50%-5px)] before:text-bold ${
                    disabled && 'opacity-25 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
        </button>
    );
}
