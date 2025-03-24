import { useState, useRef } from 'react';
import { useForm, usePage } from "@inertiajs/react";
import { Head, Link } from '@inertiajs/react';
import TitleSavings from '@/Components/TitleSavings';
import ConvertPrice from '@/Components/ConvertPrice';
import StatusBar from '@/Components/StatusBarLarge';
import InputButtons from '@/Components/InputButtons';
import { openToggle } from '@/Functions/openToggle';

// 型チェック
import { StatusTypes } from '@/types/tableStatusData';
import { SavingTypes } from '@/types/tableSavingData';
import { HistoryTypes } from '@/types/tableHistoryData';
import { UserTypes } from '@/types/tableUserData';

export default function SavingId() {
    // ✅ ユーザー情報を取得
    const { auth, statuses, savings, histories } = usePage().props as unknown as {
        auth: { user: UserTypes };
        statuses?: Record<number, StatusTypes>;
        savings?: SavingTypes[];
        histories?: HistoryTypes[];
    };

    const user = auth.user;

    // ✅ ステータス取得（存在しない場合はエラー）
    const status = statuses?.[user.id] ?? null;
    if (!status || !savings) {
        return (
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex items-center justify-center gap-2 w-full h-screen">
                        <Link
                            href='./registration'
                            className='flex items-center justify-center rounded-md border border-transparent bg-gradation min-w-32 max-w-52 px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation'>
                            初回登録した？
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ✅ 現在のユーザーに関連する目標を取得
    const saving = savings.find((s) => s.user_id === user.id);
    if (!saving) {
        return <div><p>目標が見つかりません。</p></div>;
    }

    // ✅ 履歴の取得（ユーザーに関連するもののみ）
    const userHistories = histories?.filter((h) => h.user_id === user.id) ?? [];

    // ✅ 積立額の計算
    const calculateTotalSavings = (savingsId: number, histories: HistoryTypes[]): number => {
        return histories
            .filter((history) => history.goal_id === savingsId)
            .map((history) => parseFloat(String(history.deadline)))
            .reduce((total, amount) => total + amount, 0);
    };

    // ✅ 状態管理
    const [statusBarAmount, setStatusBarAmount] = useState<number>(calculateTotalSavings(saving.id, userHistories));
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [savedPrice, setSavedPrice] = useState<number>(0);

    // ✅ 入力値変更
    const handlePriceChange = (newPrice: number) => {
        setCurrentPrice(newPrice);
    };

    // ✅ 貯金額を更新
    const handleSave = (newAmount: number) => {
        const updatedAmount = newAmount + calculateTotalSavings(saving.id, userHistories);
        setSavedPrice(updatedAmount);
        setStatusBarAmount(updatedAmount);
    };

    // ✅ 目標の締切日フォーマット
    const formattedDate = new Date(saving.deadline).toISOString().split('T')[0];

    // ✅ CSRFトークン取得
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    return (
        <div className='overflow-hidden flex items-center justify-center w-full h-full'>
            <div className='contents_box overflow-auto flex flex-col gap-5 pb-5 w-full md:max-w-[64vmin] h-screen md:border-solid border-0 md:border-8 md:border-black md:rounded-2xl '>
                <div className='flex flex-col gap-5'>
                    <ul className='px-4'>
                        <li>
                            <div>
                                <p className='text-sm font-semibold'>{formattedDate}</p>
                                <TitleSavings type={1} title={saving.title} />
                                {saving.memo && (
                                    <p className="my-4 text-center text-sm">
                                        <span className='inline-block bg-slate-600 text-white rounded-2xl py-0 px-2 mr-1 font-bold'>メモ</span>
                                        {saving.memo}
                                    </p>
                                )}
                                <form action="/saving/update" method='POST'>
                                    <input type="hidden" name="_token" value={csrfToken.current} />
                                    <input type="hidden" name="user_id" value={user.id} />
                                    <input type="hidden" name="category" value={1} />
                                    <input type="hidden" name="goal_id" value={saving.id ?? ''} />
                                    <input type="hidden" name="deadline" value={formattedDate} />
                                    <input type="hidden" name="saving_id" value={saving.id} />

                                    <div className='relative w-full h-auto mt-2'>
                                        <StatusBar
                                            size="large"
                                            total={saving.amount}
                                            amount={statusBarAmount}
                                        />
                                        <p className='absolute top-1/2 right-2 translate-y-[-50%] z-10 flex items-center justify-center text-primary font-bold mix-blend-difference'>
                                            <ConvertPrice price={statusBarAmount} />/<ConvertPrice price={saving.amount} />
                                        </p>
                                    </div>

                                    <InputButtons
                                        inputName="amount_saved"
                                        className='mt-5'
                                        onChange={handlePriceChange}
                                        onSave={handleSave}
                                    />
                                </form>

                                <Link
                                    href='./userpage'
                                    className='flex items-center justify-center rounded-md border border-transparent bg-gradation min-w-32 max-w-52 mt-10 mx-auto px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation'>
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
