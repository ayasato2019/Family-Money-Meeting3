import { ButtonHTMLAttributes } from 'react';

export default function ButtonPlus({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center border border-solid border-pink bg-white px-4 py-2 text-sm font-bold uppercase tracking-widest text-pink shadow-sm transition duration-150 ease-in-out hover:bg-pink hover:border-pink hover:text-white focus:outline-none hover:text focus:ring-2 focus:ring-pink focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
