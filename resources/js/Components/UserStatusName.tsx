import StatusBar from '@/Components/StatusBar';

export default function InputSelectInterval({
    useName,
    donation,
    level,
}: {
    useName: string;
    donation: number;
    level: number;
}) {

    return (
        <div className="overflow-hidden flex-col items-center justify-center bg-black/95 px-1 pt-0.5 pb-1 rounded-md w-1/3 max-w-80 shadow-xl text-white">
            <p className="text-sm font-bold">{useName}</p>
            <p className="text-xs mb-0.5">Level.{level}</p>
            <StatusBar amount={donation} level={level} />
        </div>
    );
}
