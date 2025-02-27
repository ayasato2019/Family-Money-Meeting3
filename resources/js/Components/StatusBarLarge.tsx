export default function StatusBar({
    amount,
    total,
    size,
}: {
    amount: number;
    total: number;
    size: 'small' | 'large'
}) {
    const denominator:number = total;
    const molecule:number = amount;
    const progress = (molecule / denominator) * 100;

    const barHeight = {
        'small': 'h-1',
        'large': 'h-6',
    }[size];

    return (
        <div className={"overflow-hidden w-full bg-gray rounded-sm "+ barHeight}>
            <div
                className="h-full bg-gradation"
                style={{
                    width: `${progress}%`,
                    transition: "width 0.5s ease",
                }}>
            </div>
        </div>
    )
}
