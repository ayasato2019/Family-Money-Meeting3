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
    const pagetitle = "ひつよう";

    //コメントの表示
    const targetType = 3;

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
        post("/needs_registration", {
            onSuccess: () => reset(),
        })
    }

    //削除
    const handleDelete = (id: number) => {
        post(`/needs_del/${id}`, {
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
        router.patch(`/needs/achieve/${id}`, {
            achieve: newValue ? 1 : 0,
        }, {
            preserveScroll: true,
        });
    };

    //コメント
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

    return (
    <AuthenticatedLayout
        header={
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={24} height={20}><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z" fill="#374151"/></svg>                {pagetitle}
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
