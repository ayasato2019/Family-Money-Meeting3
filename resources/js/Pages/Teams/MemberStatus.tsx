import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserImage from '@/Components/UserAvatar';
import CommentModal from "@/Objects/ModalComments";
import Comments from '@/Components/Comment/Comment';
import PriceConvert from '@/Components/Price/PriceConvert';

import { usePage } from '@inertiajs/react';
import { useState } from "react"
import { useForm } from "@inertiajs/react"

import { COMMENT_TARGET_TYPE, CommentTargetType } from '@/types/commentTargetType';
import { CommentsTypes } from "@/types/tableCommentsData";
import { StatusTypes } from "@/types/tableStatusData";
import { SavingTypes } from "@/types/tableSavingData";
import { HouseholdTypes } from "@/types/tableHouseholdData"
import { InvestmentTypes } from "@/types/tableInvestmentsData"
import { NeedTypes } from "@/types/tableNeedsData"
import { WantTypes } from "@/types/tableWantsData"
import { DonationTypes } from "@/types/tableDonationData"

interface Props extends PageProps {
shared_user: {
    id: number;
    name: string;
};
status: StatusTypes;
savings: SavingTypes[];
investments: InvestmentTypes[];
needs: NeedTypes[];
wants: WantTypes[];
donations: DonationTypes[];
}

export default function MemberStatus({
    shared_user,
    status,
    savings,
    investments,
    needs,
    wants,
    donations,
}: Props) {


    console.log('needs:', needs);

    //たぶの制御
    const [activeTab, setActiveTab] = useState('saving');
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const { data, setData, post, reset, processing } = useForm({
        title: "",
        price: 0,
        date: "",
        achieve: 0,
        is_shared: 0,
        images: "",
        memo: "",
        comment: "",
    })
    const { auth, comments, team_id } = usePage<PageProps & { comments: CommentsTypes[] }>().props;


    //コメント
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
    const [selectedHousehold, setSelectedHousehold] = useState<CommentsTypes | null>(null)

    const handleGenericComment = (
        item: any,
        type: CommentTargetType,
        userId: number,
        itemTitle: string,
        itemDate: string
    ) => {
        console.log('handleGenericComment called', { item, type, userId, comments });
        const targetType = COMMENT_TARGET_TYPE[type];

        // commentsが存在するかチェック
        const comment = comments && comments.find(
            (c) => c.target_id === item.id && c.target_type === targetType
        );

        const newComment: CommentsTypes = comment ?? {
            id: item.comment_id ?? 0,
            team_id: team_id ?? 0,
            user_id_to: userId,
            target_type: targetType,
            target_id: item.id,
            title: itemTitle,
            date: itemDate,
            comment: '',
        };

        setSelectedHousehold(newComment);
        setIsCommentModalOpen(true);
    };

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

    //閉じる
    const closehandleCommentModal = () => {
        setIsCommentModalOpen(false);
        setSelectedHousehold(null);
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

<div className="max-w-4xl mx-auto py-4 space-y-5">
    {/* ステータス */}
    <section className={`w-full p-2 border border-t-4 border-t- border-gray-300 rounded-md`}>
        <h2 className='flex items-center justify-center gap-2 w-full border-b border-gray-300 pb-2 text-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24}><path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z" fill="#374151"/></svg>ステータス</h2>
        {status && status.is_shared === 1 ? (
        <ul className="py-4">
            <li className="space-y-2">
            <p>ユーザーID: {status.user_id}</p>
            <p>貯金<PriceConvert price={status.saving} /></p>
            <p>投資<PriceConvert price={status.investment} /></p>
            <p>必要<PriceConvert price={status.need} /></p>
            <p>欲しい<PriceConvert price={status.want} /></p>
            <p>寄付<PriceConvert price={status.donation} /></p>
            <p>レベル<PriceConvert price={status.game_level} /></p>
            </li>
        </ul>
        ) : (
        <p className="p-4 text-gray-500">公開されているステータスはありません。</p>
        )}
    </section>

    {/* タブ切り替え */}
    <div className="overflow-hidden border-r border-l border-b pb-2 rounded-md">

        <div className="flex">
            <label
                className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'saving' ? 'bg-white border-t-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                onClick={() => handleTabClick('saving')}
            >
                <span className='hidden md:block'>ちょきん</span>
            </label>
            <label
                className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'investment' ? 'bg-white border-t-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                onClick={() => handleTabClick('investment')}
            >
                <span className='hidden md:block'>とうし</span>
            </label>
            <label
                className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'need' ? 'bg-white border-t-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                onClick={() => handleTabClick('need')}
            >
            <span className='hidden md:block'>ひつよう</span>
            </label>
            <label
                className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'want' ? 'bg-white border-t-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                onClick={() => handleTabClick('want')}
            >
                <span className='hidden md:block'>ほしい</span>
            </label>
            <label
                className={`flex-1 order-[-1] min-w-[70px] px-4 pt-3 pb-2 border-gray-100 text-gray-700 text-sm text-center cursor-pointer hover:opacity-80 ${activeTab === 'donation' ? 'bg-white border-t-[#2589d0] border-t-4' : 'bg-[#e9f0f6]'}`}
                onClick={() => handleTabClick('donation')}
            >
                <span className='hidden md:block'>きふ</span>
            </label>
        </div>

        {/* 貯金一覧 */}
        {activeTab === 'saving' && (
            <section className={`w-full px-2`}>
            <h2 className='sr-only'>貯金</h2>
            {savings && savings.length > 0 ? (
                <ul className="p-4 space-y-8">
                {savings.map((saving) => (
                    <li key={saving.id} className="">
                    <div>
                        <p className="font-bold">{saving.title}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>目標金額</span>¥{saving.amount.toLocaleString()}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>達成日目標</span>{saving.deadline}</p>
                    </div>
                    <Comments
                        className="w-full"
                        targetType={1}
                        comment={comments}
                        comment_id={saving.id}
                        onWriteClick={() => handleGenericComment(
                            saving,
                            'saving',
                            saving.user_id,
                            saving.title,
                            saving.deadline
                        )}
                    />
                </li>
            ))}
            </ul>
        ) : (
            <p className="p-4 text-gray-500">公開されている貯金はありません。</p>
        )}
        </section>
        )}

    {/* 投資一覧 */}
    {activeTab === 'investment' && (
        <section className="w-full px-2">
            <h2 className='sr-only'>投資</h2>
            {investments && investments.length > 0 ? (
                <ul className="p-4 space-y-8">
                {investments.map((item) => (
                    <li key={item.id} className="border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>日付</span>{item.date}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>金額</span>¥{item.price.toLocaleString()}</p>
                    </div>
                    <Comments
                        className="w-full"
                        targetType={2}
                        comment={comments}
                        comment_id={item.id}
                        onWriteClick={() => handleGenericComment(
                            item,
                            'investment',
                            item.user_id,
                            item.title,
                            item.date
                        )}
                    />
                </li>
            ))}
            </ul>
        ) : (
            <p className="p-4 text-gray-500">公開されている貯金はありません。</p>
        )}
        </section>
    )}

    {/* 必要一覧 */}
    {activeTab === 'need' && (
        <section className="w-full px-2">
            <h2 className='sr-only'>必要</h2>
            {needs && needs.length > 0 ? (
                <ul className="p-4 space-y-8">
                {needs.map((item) => (
                    <li key={item.id} className="border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>日付</span>{item.date}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>金額</span>¥{item.price.toLocaleString()}</p>
                    </div>
                    <Comments
                        className="w-full"
                        targetType={3}
                        comment={comments}
                        comment_id={item.id}
                        onWriteClick={() => handleGenericComment(
                            item,
                            'need',
                            item.user_id,
                            item.title,
                            item.date
                        )}
                    />
                </li>
            ))}
            </ul>
        ) : (
            <p className="p-4 text-gray-500">公開されている貯金はありません。</p>
        )}
        </section>
    )}

    {/* 欲しい一覧 */}
    {activeTab === 'want' && (
        <section className="w-full px-2">
            <h2 className='sr-only'>欲しい</h2>
            {wants && wants.length > 0 ? (
                <ul className="p-4 space-y-8">
                {wants.map((item) => (
                    <li key={item.id} className="border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>日付</span>{item.date}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>金額</span>¥{item.price.toLocaleString()}</p>
                    </div>
                    <Comments
                        className="w-full"
                        targetType={4}
                        comment={comments}
                        comment_id={item.id}
                        onWriteClick={() => handleGenericComment(
                            item,
                            'investment',
                            item.user_id,
                            item.title,
                            item.date
                        )}
                    />
                </li>
            ))}
            </ul>
        ) : (
            <p className="p-4 text-gray-500">公開されている貯金はありません。</p>
        )}        </section>
    )}

    {/* 寄付一覧 */}
    {activeTab === 'donation' && (
        <section className="w-full px-2">
            <h2 className='sr-only'>寄付</h2>
            {donations && donations.length > 0 ? (
                <ul className="mt-4 p-4 space-y-8">
                {donations.map((item) => (
                    <li key={item.id} className="border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>日付</span>{item.date}</p>
                        <p className='flex items-center justify-start gap-2'><span className='text-sm text-gray-400 font-bold'>金額</span>¥{item.price.toLocaleString()}</p>
                    </div>
                    <Comments
                        className="w-full"
                        targetType={5}
                        comment={comments}
                        comment_id={item.id}
                        onWriteClick={() => handleGenericComment(
                            item,
                            'investment',
                            item.user_id,
                            item.title,
                            item.date
                        )}
                    />
                </li>
            ))}
            </ul>
        ) : (
            <p className="p-4 text-gray-500">公開されている貯金はありません。</p>
        )}
        </section>
    )}

        </div>
    </div>

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
);
}
