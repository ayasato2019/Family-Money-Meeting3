"use client"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FarstView from '@/Objects/FarstView';

import { usePage } from '@inertiajs/react';
import { useState, useEffect } from "react"
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

import LiatDataList from "@/Objects/GenericList";

import { HouseholdTypes } from "@/types/tableHouseholdData"
import { CommentsTypes } from "@/types/tableCommentsData"
import { UserTypes } from '@/types/tableUserData';

import { router } from '@inertiajs/react';


// 型定義
interface PageProps {
    auth: {
        user: UserTypes & { role: number; team_id: number };  // ユーザーにteam_idを追加
    };
    team_id: number;  // team_idを追加
    [key: string]: any;  // インデックスシグネチャを追加
}


export default function Household({
    listdata,
}: {
    listdata: HouseholdTypes[],
}) {
    //ページタイトル
    const pagetitle = "きふ";

    //コメントの表示
    const targetType = 5;

    // 型を明示的にキャストして取得
    const { auth, team_id, comments } = usePage<PageProps & { comments: CommentsTypes[] }>().props;

    const user = auth.user;

    const { data, setData, post, reset, processing } = useForm({
        title: "",
        price: 0,
        date: "",
        achieve: 1,
        is_shared: 0,
        images: "",
        memo: "",
        comment: "",
        comment_id: 0,
    })

    //登録
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        post("/donations_registration", {
            onSuccess: () => reset(),
        })
    }

    //削除
    const handleDelete = (id: number) => {
        post(`/donations_del/${id}`, {
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

    const handleToggleAchieve = (id: number, newValue: boolean) => {
        router.patch(`/donations/achieve/${id}`, {
            achieve: newValue ? 1 : 0,
        }, {
            preserveScroll: true,
        });
    };

    //コメントモーダルの制御
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
    const [selectedHousehold, setSelectedHousehold] = useState<CommentsTypes | null>(null)

    const handleComment = (listData: HouseholdTypes) => {
        const comment = comments.find(
            (c) => c.target_id === listData.id && c.target_type === targetType
        );

        const newComment: CommentsTypes = comment ?? {
            id: listData.comment_id ?? 0,
            team_id: team_id ?? 0,
            user_id_to: listData.user_id,
            target_type: targetType,
            target_id: listData.id,
            title: listData.title,
            date: listData.date,
            comment: '',
        };
        setSelectedHousehold(newComment);
        setIsCommentModalOpen(true);
    };

    //モーダルの開閉の制御
    const closehandleCommentModal = () => {
        setIsCommentModalOpen(false)
        setSelectedHousehold(null)
    }

    //コメント書き込みボタン
    const handleCommentSubmit = (commentData: {
        id: number;
        comment: string;
        target_id: number;
        target_type: number;
        user_id_to: number;
    }) => {
    post("/comments", {
        ...commentData,
        onSuccess: () => {
        setIsCommentModalOpen(false);
        setSelectedHousehold(null);
        },
    });
    };


    console.log("寄付ページのコメント", comments)

    return (
    <AuthenticatedLayout
        header={
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={24} height={24}><path d="M312 24l0 10.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3s0 0 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8l0 10.6c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-11.4c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2L264 24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z" fill="#374151" /></svg>
                {pagetitle}
                </h1>
        }
    >
            <Head title={pagetitle} />

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
                    value="寄付先" />
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
                    name="is_shared"
                    checked={data.is_shared === 0}
                    onChange={(e) => setData("is_shared", e.target.checked ? 0 : 1)}
                />
                <InputLabel htmlFor="is_shared" value="家族と共有する" />
            </li>
            </ul>
            <PrimaryButton
                type="submit"
                disabled={processing}
                className='block mx-auto'>
                追加
            </PrimaryButton>
        </form>

        <LiatDataList
            data={listdata}
            targetType={targetType}
            onToggleAchieve={handleToggleAchieve}
            userId={user.id}
            teamId={user.team_id}
            onComment={handleComment}
            onEdit={handleEdit}
            onDelete={handleDelete}
            comments={comments}
        />

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
            onSubmit={(
                comment: {
                id: number;
                team_id: number;
                comment: string;
                target_id: number;
                target_type: number;
                user_id_to: number;
            }) => handleCommentSubmit(comment)}
        />
    </AuthenticatedLayout>
    )
}
