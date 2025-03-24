"use client"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FarstView from '@/Objects/FarstView';

import { usePage } from '@inertiajs/react';
import { useState } from "react"
import { useForm } from "@inertiajs/react"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import Checkbox from "@/Components/Checkbox"
import TextInput from "@/Components/TextInput"
import EditHouseholdModal from "@/Objects/ModalEditer"
import CommentModal from "@/Objects/ModalComments"
import InputText from "@/Components/Input/InputText"
import InputDate from "@/Components/Input/InputDate"
import InputPrice from "@/Components/Input/InputPrice"

import { HouseholdTypes } from "@/types/tableHouseholdData"
import { commentTypes } from "@/types/Comment"
import { UserTypes } from '@/types/tableUserData';

// 型定義
interface PageProps {
    auth: {
        user: UserTypes & { role: number; team_id: number };
    };
}

export default function Household({
    household,
    role,
}: {
    household: HouseholdTypes[]
    role: number
}) {
    // 型を明示的にキャストして取得
    const { auth } = usePage().props as unknown as PageProps;
    const user = auth.user;
    const user_id = auth.user.id;

    const { data, setData, post, reset, processing } = useForm({
        title: "",
        price: 0,
        date: "",
        is_share: 1,
        images: "",
        memo: "",
        comment: "",
    })

    //登録
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        post("/household_registration", {
            onSuccess: () => reset(),
        })
    }

    //削除
    const handleDelete = (id: number) => {
        post(`/household_del/${id}`, {
            method: "delete",
        })
    }

    //編集
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingHousehold, setEditingHousehold] = useState<HouseholdTypes | null>(null)

    const handleEdit = (listData: HouseholdTypes) => {
        setEditingHousehold(listData)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingHousehold(null)
    }

    //コメント
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
    const [selectedHousehold, setSelectedHousehold] = useState<commentTypes | null>(null)
    const handleComment = (listData: commentTypes) => {
        setSelectedHousehold(listData as commentTypes)
        setIsCommentModalOpen(true)
    }

    const closehandleCommentModal = () => {
        setIsCommentModalOpen(false)
        setSelectedHousehold(null)
    }

    // 今月の年月 "YYYY-MM" を取得
    const current = new Date();
    const thisMonthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;

    // months を作成
    const months = [...new Set(
        household.map((item) => item.date.slice(0, 7))
    )]
    // .filter((m) => getLastThreeMonths().includes(m))
    .sort((a, b) => a.localeCompare(b));

    // 今月のインデックスを取得
    const thisMonthIndex = months.findIndex((m) => m === thisMonthStr);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    // state
    const [currentMonthIndex, setCurrentMonthIndex] = useState(thisMonthIndex >= 0 ? thisMonthIndex : 0);

    // household を月ごとに分類
    const groupedHousehold = household.reduce((acc, item) => {
        const month = item.date.slice(0, 7); // "YYYY-MM" 形式で取得
        if (!acc[month]) acc[month] = [];
        acc[month].push(item);
        return acc;
    }, {} as Record<string, typeof household>);

    return (
        <AuthenticatedLayout
            header={
                <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={18} height={18}><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" fill="#374151"/></svg>
                    家計簿
                </h1>
            }
        >
            <Head title="ホーム" />

            <FarstView
                category={6}
            />
            <form onSubmit={handleRegister}>
                <ul className="flex flex-col gap-2 w-full mt-2 mb-4">
                <li>
                    <InputLabel
                        value="日付" />
                    <InputDate
                        type="date"
                        value={data.date}
                        className='w-full max-w-52 mt-2'
                        onChange={(e) => setData("date", e.target.value)} required />
                </li>
                <li>
                    <InputLabel
                        value="買ったもの" />
                    <InputText
                        type="text"
                        value={data.title}
                        className='w-full mt-2'
                        onChange={(e) => setData("title", e.target.value)} required />
                </li>
                <li>
                    <InputLabel
                        value="金額" />
                    <InputPrice
                        type="number"
                        value={data.price}
                        className='w-full mt-2'
                        onChange={(e) => setData("price", Number.parseFloat(e.target.value))}
                        required
                        />
                </li>
                <li>
                    <InputLabel htmlFor="memo" value="メモ" />
                    <TextInput
                        name="memo"
                        value={data.memo}
                        className='w-full mt-2'
                        onChange={(e) => setData("memo", e.target.value)} />
                </li>
                <li className="flex items-center gap-2">
                    <Checkbox
                        name="is_share"
                        checked={data.is_share === 0}
                        onChange={(e) => setData("is_share", e.target.checked ? 0 : 1)}
                    />
                    <InputLabel htmlFor="is_share" value="家族と共有する" />
                </li>
                </ul>
                <PrimaryButton
                    type="submit"
                    disabled={processing}
                    className='block mx-auto'>
                    追加
                </PrimaryButton>
            </form>

            {/* Household：3ヶ月分の横スワイプ表示 */}
            <div className="w-full my-10">
            <div className="flex items-center justify-between mb-4 py-2 border-b border-t border-gray-200">
                <button onClick={() => setCurrentMonthIndex((prev) => Math.max(prev - 1, 0))} disabled={currentMonthIndex === 0}>
                ←
                </button>
                <span className="font-medium text-lg">{months[currentMonthIndex]}</span>
                <button
                onClick={() =>
                    setCurrentMonthIndex((prev) => Math.min(prev + 1, months.length - 1))
                }
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
                <ul className={`flex flex-col gap-4 `}>
                {/* ${!recentThreeMonths.includes(months[currentMonthIndex]) ? "hidden" : ""} */}
                {groupedHousehold[months[currentMonthIndex]]
                    ?.filter(
                    (item) =>
                        // item.user_id === user.id || (item.is_share && item.team_id === user.team_id)
                        item.user_id === user.id || (!item.user_id && item.team_id === user.team_id) || (item.is_share && item.team_id === user.team_id)

                    )
                    .map((item) => (
                    <li key={item.id} className="flex items-start justify-start gap-4 border-b pb-2">
                        <ul className="flex flex-col gap-1 w-full">
                        <li className="flex gap-4 w-full">
                            <time>{item.date}</time>
                            <p className="flex-auto">{item.title}</p>
                            <p>{item.price}円</p>
                        </li>
                        {item.memo && item.memo.trim() !== "" && (
                            <li>
                            <span className="text-white font-bold bg-gray-400 text-xs py-1 px-2 rounded-2xl mr-2">メモ</span>
                            {item.memo}
                            </li>
                        )}
                        </ul>
                        <button className="w-6 h-6" onClick={() => handleEdit(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={16} height={16}>
                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                        </svg>
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>


        <EditHouseholdModal
            isOpen={isModalOpen}
            onClose={closeModal}
            listData={editingHousehold}
            isDelete={ handleDelete}
        />

        <CommentModal
            isCommentOpen={isCommentModalOpen}
            onCommentClose={closehandleCommentModal}
            listData={selectedHousehold}
        />
    </AuthenticatedLayout>
    )
}
