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
statuses: StatusTypes;
savings: SavingTypes[];
// investments: Investment[];
// needs: Need[];
// wants: Want[];
// donations: Donation[];
}

export default function MemberStatus({
    shared_user,
    statuses,
    savings
}: Props) {

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

    <div className="max-w-4xl mx-auto p-4">
        {/* ステータス一覧 */}
        <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">ステータス</h2>
        {statuses && statuses.is_shared === 1 ? (
        <ul className="space-y-2">
            <li className="p-3 bg-white shadow rounded">
            <p>ユーザーID: {statuses.user_id}</p>
            <p>貯金: ¥{statuses.saving.toLocaleString()}</p>
            <p>投資: ¥{statuses.investment.toLocaleString()}</p>
            <p>必要: ¥{statuses.need.toLocaleString()}</p>
            <p>欲しい: ¥{statuses.want.toLocaleString()}</p>
            <p>寄付: ¥{statuses.donation.toLocaleString()}</p>
            <p>レベル: Lv.{statuses.game_level}</p>

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

        {/* 貯金一覧 */}
        <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">貯金</h2>
        {savings.length > 0 ? (
            <ul className="space-y-2">
            {savings.map((saving) => (
                <li key={saving.id} className="px-4 py-2 bg-white shadow rounded">
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
