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
    listdata: HouseholdTypes[]
}) {

    //ページタイトル
    const pagetitle = "ほしい";

    //コメントの表示
    const targetType = 4;

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
        post("/wants_registration", {
            onSuccess: () => reset(),
        })
    }

    //削除
    const handleDelete = (id: number) => {
        post(`/wants_del/${id}`, {
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
        router.patch(`/wants/achieve/${id}`, {
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={18} height={18}><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" fill="#374151"/></svg>{pagetitle}</h1>
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
