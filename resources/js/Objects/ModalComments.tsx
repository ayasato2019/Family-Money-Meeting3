"use client"

import Comment from '@/Objects/Comment';
import { useEffect } from "react"
import { useForm } from "@inertiajs/react"
import Modal from "@/Components/Modal"

interface CommentModalProps {
    isCommentOpen: boolean
    onCommentClose: () => void
    listData: {
        id: number,
        comment: string,
    } | null
}

export default function CommentModal({
    isCommentOpen,
    onCommentClose,
    listData
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
        e.preventDefault()
        if (!listData?.id) return

        post(`/comments`, {
            onSuccess: () => {
                onCommentClose()
                reset()
            },
        })
    }

    return (
        <Modal show={isCommentOpen} onClose={onCommentClose}>
            <div className="relative p-6">
                <h3 className="text-lg font-medium mb-4">コメント</h3>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <input
                            id="comment"
                            type="text"
                            value={data.comment || ""}
                            onChange={(e) => setData("comment", e.target.value)}
                            className="border rounded p-2"
                        />
                    </div>
                </div>
                <div className="mt-6 flex gap-4 justify-end">
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        onClick={handleUpdate}
                        disabled={processing}
                    >
                        更新
                    </button>
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
        </Modal>
    )
}

