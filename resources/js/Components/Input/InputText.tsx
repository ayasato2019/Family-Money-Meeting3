import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        placeholder = '',
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean; placeholder?: string },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            placeholder={placeholder} // プレースホルダーを設定
            className={
                'rounded-md border-gray-300 shadow-sm p-2 text-sm leading-none focus:border-indigo-500 focus:ring-indigo-500 dark:text-black ' +
                className
            }
            ref={localRef}
        />
    );
});
