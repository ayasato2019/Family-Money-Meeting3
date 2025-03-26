import { useState, useEffect } from "react";

type Comment = {
    id: number;
    user_id_from: number;
    user_id_to: number;
    target_type: number;
    target_id: number;
    comment: string;
};

interface Props {
    targetType: number; // ターゲットタイプ（例：0=家計簿）
    targetId: number; // ターゲットID（例：特定の家計簿ID）
}

export default function Comments({
    targetType,
    targetId }:
    Props) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
        try {
            const response = await fetch(`/comments/${targetType}/${targetId}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("コメントの取得に失敗しました:", error);
        }
        };

        fetchComments();
    }, [targetType, targetId]);

    return (
        <div>
        <h3>コメント</h3>
        {comments.length === 0 ? (
            <p>コメントはまだありません。</p>
        ) : (
            <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                <strong>{comment.user_id_from}</strong>: {comment.comment}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
