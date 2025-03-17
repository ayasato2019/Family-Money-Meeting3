"use client"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FarstView from '@/Objects/FarstView';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Thumbs, Controller } from 'swiper/modules';

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import Checkbox from "@/Components/Checkbox"
import TextInput from "@/Components/TextInput"
import EditHouseholdModal from "@/Objects/ModalEditer"
import CommentModal from "@/Objects/ModalComments"
import { HouseholdTypes } from "@/types/Household"
import { commentTypes } from "@/types/Comment"
import InputText from "@/Components/Input/InputText"
import InputDate from "@/Components/Input/InputDate"
import InputPrice from "@/Components/Input/InputPrice"

export default function Household({
    household,
    role,
}: {
    household: HouseholdTypes[]
    role: number
}) {
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

    // 「月ごと」に分類
    // Swiper インスタンスを管理する state
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

    // 📌 現在の年月と過去2か月を取得
    const getLastThreeMonths = () => {
        const today = new Date();
        const months = [];
        for (let i = 0; i < 3; i++) {
            const year = today.getFullYear();
            const month = today.getMonth() + 1 - i; // 現在の月から1つずつ引く
            const adjustedYear = month <= 0 ? year - 1 : year; // 年を補正
            const adjustedMonth = month <= 0 ? 12 + month : month; // 月を補正
            months.push(`${adjustedYear}-${String(adjustedMonth).padStart(2, "0")}`);
        }
        return months;
    };

    // household のデータから取得した月と結合
    const months = [...new Set([
        ...getLastThreeMonths(),
        ...household.map((item) => item.date.slice(0, 7)),
    ])]
    .sort((a, b) => a.localeCompare(b)); // 昇順にソート

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
                {/* <li className="flex flex-col gap-2 w-full my-2">
                    <InputLabel htmlFor="images" value="レシート登録" />
                    <input
                        name="images"
                        type="file"
                        value={data.images}
                        onChange={(e) => setData("images", e.target.value)}
                    />
                </li> */}
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

            <div className="w-full mt-10">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={3}
                    spaceBetween={10}
                    watchSlidesProgress
                    controller={{ control: mainSwiper }}
                    modules={[Thumbs, Controller]}
                >
                    {months.map((month) => (
                        <SwiperSlide key={month} className="border-t border-b text-center p-2 cursor-pointer hover:bg-blue-100">
                            {month}
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    onSwiper={setMainSwiper}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    }}
                    controller={{ control: thumbsSwiper }}
                    modules={[Navigation, Pagination, Thumbs, Controller]}
                >
                {household.filter((item) => item.is_share || role === 10).length > 0 ? (
                Object.entries(groupedHousehold).map(([month, items]) => {
                    // **各月の household データをフィルタリング**
                    const filteredItems = items.filter((item) => item.is_share || role === 10);

                    // **この月に表示すべきデータがない場合はスキップ**
                    if (filteredItems.length === 0) return null;
                    return (
                        <SwiperSlide key={month} className="pb-10">
                            {filteredItems.map((item) => (
                            <li key={item.id} className="mt-6 flex items-start justify-start gap-4">
                                    <button className="w-6 h-6" onClick={() => handleDelete(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16}>
                                            <path
                                                fill="#dd5e5e"
                                                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                                            />
                                        </svg>
                                    </button>
                                    <ul className="flex flex-col gap-1 w-full">
                                        <li className="flex gap-4 w-full"><time>{item.date}</time><p className='flex-auto'>{item.title}</p><p>{item.price}円</p></li>
                                        {item.memo && typeof item.memo === "string" && item.memo.trim() !== "" && (
                                            <li>
                                                <span className='text-white font-bold bg-gray-400 text-xs py-1 px-2 rounded-2xl mr-2'>メモ</span>
                                                {item.memo}
                                            </li>
                                        )}
                                    </ul>
                                    <button className="w-6 h-6" onClick={() => handleEdit(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={16} height={16}><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                                    </button>

                                {/* <button
                                    className="w-6 h-6"
                                    onClick={() => handleComment(item)}
                                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg></button> */}

                            </li>
                    ))}
                </SwiperSlide>
            );
        })
    ) : (
        <p>共有されていないデータはありません</p>
    )}
    </Swiper>
    </div>

        <EditHouseholdModal
            isOpen={isModalOpen}
            onClose={closeModal}
            listData={editingHousehold}
        />

        <CommentModal
            isCommentOpen={isCommentModalOpen}
            onCommentClose={closehandleCommentModal}
            listData={selectedHousehold}
        />
    </AuthenticatedLayout>
    )
}

