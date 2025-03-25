import { useEffect } from "react"
import { useForm } from "@inertiajs/react"
import Modal from "@/Components/Modal/Modal"
import Button from "@/Components/Button/PrimaryButton"

interface CommentModalProps {
    isCommentOpen: boolean;
    onCommentClose: () => void;
    listData: {
    user_id_to: number;
    target_type: number;
    target_id: number;
    id: number;
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
        comment: "",
    })

    useEffect(() => {
        if (listData) {
            setData({
                comment: "",
            })
        }
    }, [listData, setData])

    useEffect(() => {
        if (!isCommentOpen) {
            reset()
        }
    }, [isCommentOpen, reset])

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!listData) return;
        setData((prev) => ({
            ...prev,
            id: listData.id,
            target_id: listData.target_id,
            target_type: listData.target_type,
            user_id_to: listData.user_id_to,
        }));
        post("/comments", {
            onSuccess: () => {
                onCommentClose();
                reset();
            },
        });
    };


    return (
        <Modal show={isCommentOpen} onClose={onCommentClose} maxWidth="md">
        <form onSubmit={handleUpdate}>
            <p>{listData?.user_id_to ?? 0}</p>
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
                    {/* 閉じるアイコン */}
                </button>
            </div>
        </form>

        </Modal>
    )
}

