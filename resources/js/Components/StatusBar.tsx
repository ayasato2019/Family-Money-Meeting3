export default function StatusBar({
    amount,
    level,
}: {
    amount: number;
    level: number;
}) {
    let maximum: number = 0;

    if (0 === level) {
        maximum = 1000;
    } else if (1 === level) {
        maximum = 2000;
    } else if (3 === level) {
        maximum = 3000;
    } else if (4 === level) {
        maximum = 4000;
    } else if (5 == level) {
        maximum = 5000;
    }

    const progress = (amount % 1000) / 1000 * 100;

    return (
        <div className={"overflow-hidden w-full bg-gray rounded-sm "}>
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
