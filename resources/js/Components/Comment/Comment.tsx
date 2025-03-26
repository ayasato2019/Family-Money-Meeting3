import { useState, useEffect } from "react";
import UserAvatar from '@/Components/UserAvatar';
import { CommentsTypes } from "@/types/tableCommentsData";

type Comment = {
    target_id: number;
    target_type: number;
    comment: string;
    user_id_from: number;

};

export default function CommentLeft({
    className,
    comment = [],
    user_id,
    comment_id,
    targetType,
    onWriteClick,
}: {
    className?: string;
    comment?: CommentsTypes[];
    targetType: number;
    user_id?: number;
    comment_id: number;
    onWriteClick?: () => void;
}) {

    const [comments, setComments] = useState<Comment[]>([]);
    const targetId = comment_id;

    useEffect(() => {
        const fetchComments = async () => {
            if (targetId && targetId !== 0) {  // targetId が有効な場合にのみ実行
                try {
                    const response = await fetch(`/comments/${targetType}/${targetId}`);
                    const data = await response.json();
                    setComments(Array.isArray(data) ? data : []); // 配列でない場合は空配列を設定
                } catch (error) {
                    console.error("コメントの取得に失敗しました:", error);
                }
            }
        };

        fetchComments();
    }, [targetType, targetId]); // targetTypeとtargetIdの変更に応じて再実行

    return (
        <div className={`flex items-center justify-end ${className || ''}`}>
            {comments.length === 0 ? (
                <button onClick={onWriteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={18} height={16} className='fill-gray-500'>
                        <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                    </svg>
                </button>
            ) : (
                <ul className="w-full space-y-1">
                    {comments
                        // .filter((c) => c.target_id === targetId) // targetIdと一致するコメントをフィルタリング
                        .map((comment, index) => (
                            <li
                                className="flex items-center justify-end gap-2 flex-nowrap w-full"
                                key={index}>
                                <span className="balloon right">{comment.comment}</span>
                                <UserAvatar
                                    userId={comment.user_id_from}
                                    allowUpload={false} />
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
