import { useState } from "react";
import { LiatDataTypes } from "@/types/genericList";
import { CommentsTypes } from "@/types/tableCommentsData";
import CheckBox from "@/Components/Checkbox/Checkbox";
import Comments from '@/Components/Comment/Comment';

interface Props {
    data: LiatDataTypes[];
    comments: CommentsTypes[];
    targetType: number;
    onEdit: (item: LiatDataTypes) => void;
    onDelete: (id: number) => void;
    onToggleAchieve: (id: number, newValue: boolean) => void;
    onComment: (item: LiatDataTypes) => void;
    userId: number;
    teamId: number;
}

export default function LiatDataList({
    data,
    comments,
    targetType,
    onEdit,
    onDelete,
    onComment,
    onToggleAchieve,
    userId,
    teamId,
}: Props) {

    const current = new Date();
    const thisMonthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;

    const months = [...new Set(data.map((item) => item.date.slice(0, 7)))].sort((a, b) => a.localeCompare(b));
    const thisMonthIndex = months.findIndex((m) => m === thisMonthStr);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(thisMonthIndex >= 0 ? thisMonthIndex : 0);

    const [achievedIds, setAchievedIds] = useState<number[]>([]);
    const toggleAchieve = (id: number) => {
        setAchievedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const groupedData = data.reduce((acc: Record<string, LiatDataTypes[]>, item: LiatDataTypes) => {
        const month = item.date.slice(0, 7);
        if (!acc[month]) acc[month] = [];
        acc[month].push(item);
        return acc;
    }, {});

return (
    <div className="w-full my-10">
    <div className="flex items-center justify-between mb-4 py-2 border-b border-t border-gray-200">
        <button onClick={() => setCurrentMonthIndex((prev) => Math.max(prev - 1, 0))} disabled={currentMonthIndex === 0}>
        ←
        </button>
        <span className="font-medium text-lg">{months[currentMonthIndex]}</span>
        <button
        onClick={() => setCurrentMonthIndex((prev) => Math.min(prev + 1, months.length - 1))}
        disabled={currentMonthIndex === months.length - 1}
        >
        →
        </button>
    </div>

    <div
        className="transition-transform duration-300 ease-in-out"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
        if (touchStart === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        if (Math.abs(diff) > 50) {
            if (diff > 0) setCurrentMonthIndex((i) => Math.min(i + 1, months.length - 1));
            else setCurrentMonthIndex((i) => Math.max(i - 1, 0));
        }
        setTouchStart(null);
        }}
    >
        <ul className="flex flex-col gap-4">
        {groupedData[months[currentMonthIndex]]
            ?.filter((item: LiatDataTypes) =>
            item.user_id == userId ||
            (item.team_id === teamId || item.is_shared === 1)
            )
            .map((item) => {
                const isAchieved = achievedIds.includes(item.id);
                return (
                <li key={item.id} className="flex flex-col gap-0 border-b pb-4">
                    <div className="flex items-start justify-start">
                        <ul className="flex flex-col gap-1 w-full">
                            <li className="flex flex-col gap-1 w-full">
                                <div className="flex items-center gap-4 w-full">
                                <CheckBox
                                    name="achieve"
                                    checked={item.achieve}
                                    onChange={(e) => onToggleAchieve(item.id, e.target.checked)}
                                />
                                <time>{item.date}</time>
                                <p className="flex-auto">{item.title}</p>
                                <p>{item.price}円</p>
                                </div>
                            {item.memo && item.memo.trim() !== "" && (
                                <p className="pl-8">
                                <span className="text-white font-bold bg-gray-400 text-xs py-1 px-2 rounded-2xl mr-2">メモ</span>
                                {item.memo}
                                </p>
                            )}
                            </li>
                        </ul>
                        <button className="flex items-center w-6 h-6 pl-2" onClick={() => onEdit(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={16} height={16}>
                                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                            </svg>
                        </button>
                    </div>
                    <Comments
                        className="w-full"
                        targetType={targetType}
                        comment={comments}
                        comment_id={item.id}
                        onWriteClick={() => onComment(item)}
                    />
                </li>
                );
            })}
        </ul>
    </div>
    </div>
);
}
