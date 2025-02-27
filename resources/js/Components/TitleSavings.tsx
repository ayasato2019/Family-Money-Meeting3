export default function TitleSavings({
    className = '',
    title,
    type,
    ...props
}: {
    title: string,
    className?: string,
    type: number
}) {

    const typeClass = {
        1: 'primary',    // '長'に対応
        2: 'pink',   // '中'に対応
        3: 'orange', // '短'に対応
    }[type];

    const displayText = {
        1: '長',
        2: '中',
        3: '短',
    }[type];

    return (
        <div className={`relative flex flex-nowrap items-center justify-center gap-1 w-auto `+ className }>
            {/* <span className={`inline-flex items-center justify-center px-1 py-1 text-${typeClass} border-2 border-${typeClass} leading-none font-bold text-sm rounded-sm dark:bg-black/95`}>{displayText}</span> */}
            <h3
                className={
                    'inline-block py-1 w-auto text-lg font-bold leading-none focus:outline-none ' +
                    className
                }
            >{title}</h3>
        </div>
    );
}
