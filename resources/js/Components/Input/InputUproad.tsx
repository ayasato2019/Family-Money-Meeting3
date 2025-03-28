import React from 'react';
import { InputHTMLAttributes } from 'react';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onFileSelect?: (files: FileList | null) => void; // ファイル選択時のコールバック
}

export default function FileInput({
    className = '',
    onFileSelect,
    ...props
}: FileInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFileSelect?.(e.target.files); // ファイルリストをコールバックに渡す
        props.onChange?.(e); // 他のonChangeハンドラを呼び出す
    };

    return (
        <input
            {...props}
            type="file"
            className={
                'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ' +
                className
            }
            onChange={handleChange}
        />
    );
}
