export default function TitlePages({
    className = '',
    title,
    ...props
}: { title: string, className?: string }) {
    return (
        <h1
            className={
                'block text-center border-b border-primary py-1 text-lg font-bold leading-5 focus:outline-none font-secondry ' +
                className
            }
        >
            {title}
        </h1>
    );
}
