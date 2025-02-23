"use client"

import type React from "react"

import { useEffect } from "react"
import { useForm } from "@inertiajs/react"
import Modal from "@/Components/Modal"

interface CommentModalProps {
  isCommentOpen: boolean
  onCommentClose: () => void
  listData: {
    id: number
    title: string
    price: number
    date: string
    is_share: boolean
    images?: string | null
    memo?: string | null
  } | null
}

export default function CommentModal({ isCommentOpen, onCommentClose, listData }: CommentModalProps) {
  const { data, setData, post, processing, reset } = useForm({
    title: "",
    price: 0,
    date: "",
    is_share: 1,
    images: "",
    memo: "",
  })

  useEffect(() => {
    if (listData) {
      setData({
        title: listData.title,
        price: listData.price,
        date: listData.date,
        is_share: listData.is_share ? 1 : 0,
        images: listData.images || "",
        memo: listData.memo || "",
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

    post(`/household_edit/${listData.id}`, {
      onSuccess: () => {
        onCommentClose()
        reset()
      },
    })
  }

  return (
    <Modal show={isCommentOpen} onClose={onCommentClose}>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">編集</h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="date">日付</label>
            <input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => setData("date", e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">金額</label>
            <input
              id="price"
              type="number"
              value={data.price}
              onChange={(e) => setData("price", Number(e.target.value))}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="memo">メモ</label>
            <input
              id="memo"
              type="text"
              value={data.memo || ""}
              onChange={(e) => setData("memo", e.target.value)}
              className="border rounded p-2"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-4 justify-end">
          <button
            type="button"
            className="border-red-500 border-solid border-2 text-red-500 px-4 py-2 rounded"
            onClick={onCommentClose}
          >
            閉じる
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleUpdate}
            disabled={processing}
          >
            更新
          </button>
        </div>
      </div>
    </Modal>
  )
}

