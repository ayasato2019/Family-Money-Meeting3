import { InputHTMLAttributes } from 'react';

export default function CheckboxMinus({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-5 w-5 rounded-sm border-gray text-blue shadow-sm focus:ring-blue ' +
                className
            }
        />
    );
}
