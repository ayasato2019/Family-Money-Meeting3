import { useState, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import TitleSavings from '@/Components/TitleSavings';
import ConvertPrice from '@/Components/ConvertPrice';
import StatusBar from '@/Components/StatusBarLarge';
import InputButtons from '@/Components/InputButtons';
import FarstView from '@/Ui/FarstViewAvatar';
import { openToggle } from '@/Functions/openToggle';
// 型チェック
import { StatusTypes } from '@/types/tableStatusData';
import { SavingTypes } from '@/types/tableSavingData';

interface HistoryTypes {
    id: number;
    user_id: number;
    goal_id: number;
    amount: number;
    created_at: string;
    updated_at: string;
};

export default function SavingId() {
    const user = usePage().props.auth.user;

    // ステータスの確認
    const { statuses } = usePage().props as {
        statuses?: StatusTypes[],
    };
    const status = statuses?.[user.id] ?? null;

    // 貯金目標の確認
    const { savings } = usePage().props as {
        savings?: SavingTypes,
    };

    if (!savings) {
        return (
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex items-center justify-center gap-2 w-full h-screen">
                        <Link href='./registration' className='flex items-center justify-center rounded-md border border-transparent bg-gradation min-w-32 max-w-52 px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation'>
                            初回登録した？
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 修正後の貯金目標データ
    type SavingType = {
        id: number;
        user_id: number;
        goal_id: number;
        title: string;
        amount: number;
        deadline: string;
        achieve: number;
        level: number;
        images?: string | null;
        is_shared: boolean;
        memo?: string | null;
    };

    const saving: SavingType = {
        id: savings.id,
        user_id: savings.user_id,
        goal_id: savings.goal_id,
        title: savings.title,
        amount: savings.amount,
        deadline: savings.deadline,
        achieve: savings.achieve,
        level: savings.level,
        images: savings.images,
        is_shared: !!savings.is_shared,
        memo: savings.memo,
    };

    console.log("saving.id->" + saving.id);
    console.log("saving.user_id->" + saving.user_id);
    console.log("saving.goal_id->" + saving.goal_id);
    console.log("saving.title->" + saving.title);
    console.log("saving.amount->" + saving.amount);
    console.log("saving.level->" + saving.level);
    console.log("saving.images->" + saving.images);
    console.log("saving.is_shared->" + saving.is_shared);
    console.log("saving.memo->" + saving.memo);

    // 必要なstate
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [statusBarAmount, setStatusBarAmount] = useState<number>(saving.achieve);

    // 入力値の変更をハンドル
    const handlePriceChange = (newPrice: number) => {
        setCurrentPrice(newPrice);
    };

    // 貯金追加の処理
    const handleSave = (newAmount: number) => {
        setStatusBarAmount(prev => prev + newAmount);
    };

    const date = new Date(saving.deadline).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='overflow-hidden flex items-center justify-center w-full h-full'>
            <div className='contents_box overflow-auto flex flex-col gap-5 pb-5 w-full md:max-w-[64vmin] h-screen md:border-solid border-0 md:border-8 md:border-black md:rounded-2xl'>
                <FarstView
                    UserData={user}
                    category={1}
                    fvImages={saving.images || "https://borderlesss.sakura.ne.jp/ss1/assets/images/photo-noimages.jpg"}
                />
                <div className='flex flex-col gap-5'>
                    <ul className='px-4'>
                        <li>
                            <div>
                                <p className='text-sm font-semibold'>{date}</p>
                                <TitleSavings type={1} title={saving.title} />
                                {saving.memo && (
                                    <p className="my-4 text-center text-sm">
                                        <span className='inline-block bg-slate-600 text-white rounded-2xl py-0 px-2 mr-1 font-bold'>メモ</span>
                                        {saving.memo}
                                    </p>
                                )}
                                <form action="./update" method='POST'>
                                    <input type="hidden" name="user_id" value={user.id} />
                                    <input type="hidden" name="goal_id" value={saving.goal_id} />
                                    <input type="hidden" name="date_saved" value={today} />
                                    <input type="hidden" name="saving_id" value={saving.id} />

                                    <div className='relative w-full h-auto mt-2'>
                                        <StatusBar size="large" total={saving.amount} amount={statusBarAmount} />
                                        <p className='absolute top-1/2 right-2 translate-y-[-50%] z-10 flex items-center justify-center text-primary font-bold mix-blend-difference'>
                                            <ConvertPrice price={statusBarAmount} />/<ConvertPrice price={saving.amount} />
                                        </p>
                                    </div>
                                    <InputButtons inputName="amount_saved" className='mt-5' onChange={handlePriceChange} onSave={handleSave} />
                                </form>
                                <Link href='./userpage' className='flex items-center justify-center rounded-md bg-gradation min-w-32 max-w-52 mt-10 mx-auto px-4 py-2 text-sm font-bold uppercase tracking-widest text-white'>
                                    ユーザーページ
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
