import { ButtonHTMLAttributes } from 'react';

export default function ButtonSecondary({
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
                `inline-flex items-center justify-center rounded-md min-w-32 max-w-52 max-h-10 border border-solid border-primary bg-white px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary shadow-sm transition duration-150 ease-in-out hover:bg-orange hover:border-orange hover:text-white  focus:outline-none hover:text focus:ring-2 focus:ring-orange focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
