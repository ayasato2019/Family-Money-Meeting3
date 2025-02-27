export default function TitleListInvestements({
    className = '',
    title,
    // type,
    ...props
}: { title: string, className?: string,}) { // type: 2 | 1

    // const typeClass = {
    //     1: 'primary',    // '長'に対応
    //     2: 'pink',   // '中'に対応
    // }[type];

    // const displayText = {
    //     1: '投資信託',
    //     2: '国内株式',
    //     3: '米国株式',
    //     4: '米国株式',
    // }[type];

    return (
        <div className={`relative flex flex-nowrap items-center justify-center gap-1 w-auto `+ className }>
            {/* <span className={`inline-flex items-center justify-center px-1 py-1 leading-none font-bold text-sm rounded-sm bg-black/95`}>{displayText}</span> */}
            <h3
                className={
                    'inline-block py-1 w-auto text-lg font-bold leading-none focus:outline-none ' +
                    className
                }
            >{title}</h3>
        </div>
    );
}
