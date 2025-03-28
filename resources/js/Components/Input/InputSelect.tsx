import { SelectHTMLAttributes } from 'react';

export default function InputSelect({
    value,
    className = '',
    options = [],
    ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
    options?: { value: string; label: string }[];
}) {

    return (
        <div
        className={`relative block w-auto h-auto border border-solid border-gray rounded max-h-11  ${className}`}>
            <select
                value={value}
                {...props}
                className={`block w-auto text-sm font-bold border-0 border-transport rounded h-10 pl-2 pr-6 py-0 focus:ring-2 focus:ring-primary focus:outline-primary focus:ring-offset-2`}
                style={{
                    backgroundImage: 'none',
                }}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {/* カスタムアイコン */}
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" fill="none">
                    <path fill="#9D9D9D" d="M4.655 3.933a1 1 0 0 1-1.31 0L.831 1.756C.131 1.15.561 0 1.486 0h5.028c.926 0 1.354 1.15.655 1.756z" />
                </svg>
            </span>
        </div>
    );
}
