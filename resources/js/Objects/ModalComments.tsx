import { useEffect } from "react"
import { useForm } from "@inertiajs/react"
import { usePage } from '@inertiajs/react';

import { UserTypes } from '@/types/tableUserData';
import { CommentsTypes } from "@/types/tableCommentsData"

import Modal from "@/Components/Modal/Modal"
import Button from "@/Components/Button/PrimaryButton"
import UserImage from '@/Components/UserAvatar';

interface PageProps {
    auth: {
        user: UserTypes;
        };
    comments: CommentsTypes[];
    // 他のページのプロパティも必要に応じて追加
}

export interface CommentModalProps {
    isCommentOpen: boolean;
    onCommentClose: () => void;
    listData: {
        user_id_to: number;
        user_id_from: number;
        target_type: number;
        target_id: number;
        id: number;
        comment_id?: number;
        comment: string;
        title?: string;
        date?: string;
    } | null;
    onSubmit: (comment: {
        id: number;
        comment: string;
        target_id: number;
        target_type: number;
        user_id_to: number;
    }) => void;
}

export default function CommentModal({
    isCommentOpen,
    onCommentClose,
    listData,
    onSubmit,
}: CommentModalProps) {
    const { data, setData, post, processing, reset } = useForm({
        id: 0,
        user_id_to: 0,
        user_id_from: 0,
        target_id: 0,
        target_type: 0,
        comment: "",
    });

    // ログイン中のユーザーIDを取得
const { auth, comments } = usePage().props as unknown as PageProps;
const user_id = auth.user.id;
    // コメント対象データが存在する場合、必要なデータを設定
    useEffect(() => {
        if (listData && listData.comment_id !== 0 && listData.target_type !== 0) {
            setData({
                comment: listData.comment,
                id: listData.id,
                target_id: listData.target_id,
                target_type: listData.target_type,
                user_id_to: listData.user_id_to,
                user_id_from: user_id,
            });
        } else if (listData) {
            // listDataが存在する場合、ログインユーザーのIDとtarget_idを設定
            setData({
                comment: '',
                id: listData.id,
                target_id: listData.target_id, // listDataから取得
                target_type: listData.target_type, // listDataから取得
                user_id_to: listData.user_id_to || auth.user.id, // コメントする相手ユーザーID
                user_id_from: user_id, // 自分のユーザーID
            });
        }
    }, [listData, auth.user.id]);

    // コメントフォームが閉じられたときにリセット
    useEffect(() => {
        if (!isCommentOpen) {
            reset();
        }
    }, [isCommentOpen, reset]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!listData) return;
        // フォームデータを送信
        post("/comments", {
            ...data,
            onSuccess: () => {
                onCommentClose();
                reset();
            },
        });
    };

    // コメントが無効な場合、コメントフォームを表示しない
    // if () {
    //     return (
    //         <Modal show={isCommentOpen} onClose={onCommentClose} maxWidth="md">
    //             <div className="p-6">
    //                 <p className="text-gray-500">コメントがありません。もしくは書き込み不可。</p>
    //             </div>
    //         </Modal>
    //     );
    // }

    return (
        <Modal show={isCommentOpen} onClose={onCommentClose} maxWidth="md">
            <form onSubmit={handleUpdate}>
                <div className="relative p-6">
                    <p className="flex gap-2 text-lg font-medium mb-4">
                        <span className="text-gray-500">{listData?.date ?? ""}</span>
                        {listData?.title ?? "タイトルなし"}
                    </p>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <input
                                id="comment"
                                type="text"
                                value={data.comment}
                                onChange={(e) => setData("comment", e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4 justify-end">
                        <Button type="submit" disabled={processing}>
                            コメント
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="absolute top-0 right-0 p-1"
                        onClick={onCommentClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="#666" />
                        </svg>
                    </button>
                </div>
            </form>
        </Modal>
    );
}
