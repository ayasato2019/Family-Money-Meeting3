import { useState, InputHTMLAttributes } from 'react';

interface InputPriceProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: number;        // valueをnumber型に変更
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // onChangeを受け取る
    className?: string;   // classNameを任意に指定
    name?: string;
}

export default function InputPrice({
    value,
    name,
    onChange,
    className = '',
    ...props
}: InputPriceProps) {

    const handleIncrease = () => {
        const newPrice = (Number(value) || 0) + 100; // valueを数値に変換してから加算
        onChange({ target: { value: newPrice.toString() } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleDecrease = () => {
        const newPrice = Math.max(0, (Number(value) || 0) - 100); // valueを数値に変換してから減算
        onChange({ target: { value: newPrice.toString() } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event); // 親に直接通知
    };

    return (
        <div className={`inline-flex items-center justify-center bg-white px-2 rounded-md w-auto max-w-52 h-10 border border-solid border-gray-300 shadow-sm  ${className}`}>
            <button
                type="button"
                onClick={handleDecrease}
                className='relative'
                aria-label="Decrease price"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                    <path fill="#6313B9" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                </svg>
            </button>
            <input
                name={name}
                type="number"
                className='text-black bg-white text-right border-0 focus:ring-0 focus:outline-none py-0 w-full background-none '
                value={value}
                onChange={handleChange}
                aria-label="Price"
                {...props}
            />
            <button
                type="button"
                onClick={handleIncrease}
                className='relative'
                aria-label="Increase price"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                    <path fill="#6313B9" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
            </button>
        </div>
    );
}
