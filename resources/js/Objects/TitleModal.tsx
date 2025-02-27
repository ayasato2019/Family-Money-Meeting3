export default function TitleModal({
    className = '',
    title,
    ...props
}: { title: string, className?: string }) {
    return (
        <h2
            className={
                'block text-center border-b border-primary py-1 text-lg font-bold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                className
            }
        >
            {title}
        </h2>
    );
}
