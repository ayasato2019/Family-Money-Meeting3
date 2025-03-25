import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserImage from '@/Components/UserAvatar';
import CommentModal from "@/Objects/ModalComments";

import { usePage } from '@inertiajs/react';
import { useState } from "react"
import { useForm } from "@inertiajs/react"

import { COMMENT_TARGET_TYPE, CommentTargetType } from '@/types/commentTargetType';
import { CommentsTypes } from "@/types/tableCommentsData";
import { StatusTypes } from "@/types/tableStatusData";
import { SavingTypes } from "@/types/tableSavingData";

interface Props extends PageProps {
shared_user: {
    id: number;
    name: string;
};
status: StatusTypes;
savings: SavingTypes[];
// investments: Investment[];
// needs: Need[];
// wants: Want[];
// donations: Donation[];
}

export default function MemberStatus({
    shared_user,
    status,
    savings
}: Props) {

    //たぶの制御
    const [activeTab, setActiveTab] = useState('status');
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const { data, setData, post, reset, processing } = useForm({
        title: "",
        price: 0,
        date: "",
        achieve: 0,
        is_shared: 1,
        images: "",
        memo: "",
        comment: "",
    })
    const { auth, comments } = usePage<PageProps & { comments: CommentsTypes[] }>().props;


    //コメント
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
    const [selectedHousehold, setSelectedHousehold] = useState<CommentsTypes | null>(null)
    const handleComment = (
        listData: { id: number; date: string; title?: string },
        type: CommentTargetType
        ) => {
            const targetType = COMMENT_TARGET_TYPE[type];

            const comment = comments.find(
            (c) => c.target_id === listData.id && c.target_type === targetType
            );

            const newComment: CommentsTypes = comment ?? {
            id: 0,
            user_id_from: auth.user.id,
            user_id_to: shared_user.id,
            target_type: targetType,
            target_id: listData.id,
            title: listData.title ?? type, // ステータスなどには title がない可能性も考慮
            date: listData.date,
            comment: '',
            };

            setSelectedHousehold(newComment);
            setIsCommentModalOpen(true);
        };

    const closehandleCommentModal = () => {
        setIsCommentModalOpen(false)
        setSelectedHousehold(null)
    }

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


//ページタイトル
const pagetitle = "チーム";

    return (
<AuthenticatedLayout
    header={
        <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
            <UserImage userId={shared_user.id} />
            <p className='leading-none'>{shared_user.name}</p>
        </h1>
    }
>
<Head title={`${shared_user.name}`} />

    <div className="max-w-4xl mx-auto py-4">
            {/* タブ切り替え */}
            <div className="flex">
                <label
                    className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'status' ? 'bg-white border-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                    onClick={() => handleTabClick('status')}
                >
                    ステータス
                </label>
                <label
                    className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'saving' ? 'bg-white border-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                    onClick={() => handleTabClick('saving')}
                >
                    貯金
                </label>
                {/* <label
                    className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-b border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'investment' ? 'bg-white border-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                    onClick={() => handleTabClick('investment')}
                >
                    投資
                </label>
                <label
                    className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-b border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'need' ? 'bg-white border-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                    onClick={() => handleTabClick('need')}
                >
                    必要
                </label>
                <label
                    className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-b border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'want' ? 'bg-white border-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                    onClick={() => handleTabClick('want')}
                >
                    欲しい
                </label>
                <label
                    className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-b border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'donation' ? 'bg-white border-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                    onClick={() => handleTabClick('donation')}
                >
                    寄付
                </label> */}
            </div>

    {/* ステータス */}
    {activeTab === 'status' && (
        <section className={`w-full`}>
            <h2 className='sr-only'>貯金</h2>
            {status.is_shared === 1 ? (
            <ul className="py-4">
                <li className="space-y-2">
                <p>ユーザーID: {status.user_id}</p>
                <p>貯金: ¥{status.saving.toLocaleString()}</p>
                <p>投資: ¥{status.investment.toLocaleString()}</p>
                <p>必要: ¥{status.need.toLocaleString()}</p>
                <p>欲しい: ¥{status.want.toLocaleString()}</p>
                <p>寄付: ¥{status.donation.toLocaleString()}</p>
                <p>レベル: Lv.{status.game_level}</p>

                <CommentModal
                    isCommentOpen={isCommentModalOpen}
                    onCommentClose={closehandleCommentModal}
                    listData={selectedHousehold}
                    onSubmit={handleCommentSubmit}
                />
                </li>
            </ul>
            ) : (
            <p className="text-gray-500">公開されているステータスはありません。</p>
            )}
        </section>
    )}

    {/* 貯金一覧 */}
    {activeTab === 'saving' && (
        <section className={`w-full`}>
        <h2 className='sr-only'>貯金</h2>
        {savings.length > 0 ? (
            <ul className="py-8 space-y-8">
            {savings.map((saving) => (
                <li key={saving.id} className="">
                <div>
                    <p className="font-bold">{saving.title}</p>
                    <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>目標金額</span>¥{saving.amount.toLocaleString()}</p>
                    <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>達成日目標</span>{saving.deadline}</p>
                </div>
                <CommentModal
                    isCommentOpen={isCommentModalOpen}
                    onCommentClose={closehandleCommentModal}
                    listData={selectedHousehold}
                    onSubmit={(
                        comment: {
                            id: number;
                            comment: string;
                            target_id: number;
                            target_type: number;
                            user_id_to: number;
                        }) => handleCommentSubmit(comment)}
                />
            </li>
        ))}
        </ul>
    ) : (
        <p className="text-gray-500">公開されている貯金はありません。</p>
    )}
    </section>
    )}

    {/* 以下は後日実装用 */}
    {/*
    <section className="mb-6">
    <h2 className="text-lg font-semibold">投資</h2>
    </section>

    <section className="mb-6">
    <h2 className="text-lg font-semibold">必要</h2>
    </section>

    <section className="mb-6">
    <h2 className="text-lg font-semibold">欲しい</h2>
    </section>

    <section className="mb-6">
    <h2 className="text-lg font-semibold">寄付</h2>
    </section>
    */}
    </div>

    {selectedHousehold && (
    <CommentModal
        isCommentOpen={isCommentModalOpen}
        onCommentClose={closehandleCommentModal}
        listData={selectedHousehold}
        onSubmit={handleCommentSubmit}
    />
)}
    </AuthenticatedLayout>
);
}
