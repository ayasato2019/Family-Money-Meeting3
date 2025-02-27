import { InputHTMLAttributes } from 'react';

interface CheckboxPlusProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxPlus({
    className = '',
    name,
    checked,
    onChange,
    value,
    ...props
}: CheckboxPlusProps) {
    return (
        <input
            {...props}
            type="radio"
            name={name}
            checked={checked}
            onChange={onChange}
            className={
                'h-5 w-5 rounded-[50%] border-gray text-primary shadow-sm focus:ring-primary ' +
                className
            }
        />
    );
}
