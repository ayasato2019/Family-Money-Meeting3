import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-sm border-red-600 border-solid ring-red-600 bg-white max-h-10 px-4 py-2 text-sm text-red-600 font-bold uppercase tracking-widest transition duration-150 ease-in-out hover:bg-red-600 hover:text-white  focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:bg-red-600 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
