import React from 'react';
import { InputHTMLAttributes } from 'react';

export default function Common({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-5 w-5 rounded-sm border-gray text-primary shadow-sm focus:ring-primary ' +
                className
            }
        />
    );
}
