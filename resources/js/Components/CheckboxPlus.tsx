import { InputHTMLAttributes } from 'react';

export default function CheckboxPlus({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-5 w-5 rounded-[50%] border-gray text-pink shadow-sm focus:ring-pink' +
                className
            }
        />
    );
}
