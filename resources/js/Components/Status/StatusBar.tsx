export default function StatusBar({
    amount,//目標金額
    history, //目標金額
}: {
    amount: number;
    history: number;
}) {


    const progress = history / amount * 100;

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
