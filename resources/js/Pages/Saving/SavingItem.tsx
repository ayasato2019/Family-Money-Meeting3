import { useState, useRef } from 'react';
import { usePage, Head, Link } from '@inertiajs/react';
import TitleSavings from '@/Components/Saving/TitleSavings';
import PriceConvert from '@/Components/Price/PriceConvert';
import StatusBar from '@/Components/Saving/StatusBarLarge';
import InputButtons from '@/Components/Saving/InputButtons';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FarstView from '@/Objects/FarstView';

// 型チェック
import { StatusTypes } from '@/types/tableStatusData';
import { SavingTypes } from '@/types/tableSavingData';
import { HistoryTypes } from '@/types/tableHistoryData';
import { UserTypes } from '@/types/tableUserData';

export default function SavingId() {
    // ユーザー情報を取得
    const { auth, statuses, savings, histories } = usePage().props as unknown as {
        auth: { user: UserTypes };
        statuses?: Record<number, StatusTypes>;
        savings?: SavingTypes;
        histories?: HistoryTypes[];
    };

    const user = auth.user;

    // ステータス取得（存在しない場合はエラー）
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

    // savings オブジェクトを設定
    const saving= {
        id: savings.id,
        comment_id: savings.comment_id,
        user_id: savings.user_id,
        title: savings.title,
        amount: savings.amount,
        deadline: savings.deadline,
        achieve: savings.achieve,
        level: savings.level,
        images: savings.images,
        is_shared: savings.is_shared,
        memo: savings.memo,
    };

    // 履歴の取得（ユーザーに関連するもののみ）
    const userHistories = histories?.filter((h) => h.user_id === user.id) ?? [];

    // 積立額の計算
    const calculateTotalSavings = (savingsId: number, histories: HistoryTypes[]): number => {
        const relevantHistories = histories.filter((history) => history.goal_id === savingsId);
            // フィルタリングされた履歴の amount をすべて足し合わせる
        const totalSavings = relevantHistories.reduce((total, history) => {
            // amount が正しい型であることを確認（数値に変換）
            const amount = parseFloat(String(history.amount));
            return total + (isNaN(amount) ? 0 : amount);  // amount が数値でない場合は 0 を加算
        }, 0);

        return totalSavings;
        // return histories
        //     .filter((history) => history.goal_id === savingsId)
        //     .map((history) => parseFloat(String(history.deadline)))
        //     .reduce((total, amount) => total + amount, 0);
    };

    // 状態管理
    const [statusBarAmount, setStatusBarAmount] = useState<number>(calculateTotalSavings(
        saving.id, userHistories));
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [savedPrice, setSavedPrice] = useState<number>(0);

    // 入力値変更
    const handlePriceChange = (newPrice: number) => {
        setCurrentPrice(newPrice);
    };

    // 貯金額を更新
    const handleSave = (newAmount: number) => {
        const updatedAmount = newAmount + calculateTotalSavings(saving.id, userHistories);
        setSavedPrice(updatedAmount);
        setStatusBarAmount(updatedAmount);
    };

    // 目標の締切日フォーマット
    const formattedDate = new Date(saving.deadline).toISOString().split('T')[0];

    // CSRFトークン取得
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    // 画面タイトル
    const pagetitle = "貯金";
    return (
        <AuthenticatedLayout header={
            <h1 className="w-full flex items-center justify-center text-xl font-semibold leading-tight text-gray-800">{pagetitle}</h1>
        }>
            <Head title={pagetitle} />
            <FarstView category={1} />
            <div className='space-y-4'>
                <TitleSavings type={1} title={saving.title} />
                <p className='flex items-center gap-2 text-sm font-bold'><span className="inline-flex px-2 py-1 bg-gray-500 rounded-2xl text-white font-bold">目標達成予定日</span>{formattedDate}</p>
                {saving.memo && (
                    <p className="my-4 text-center text-sm">
                        <span className='inline-block bg-slate-600 text-white rounded-2xl py-0 px-2 mr-1 font-bold'>メモ</span>
                        {saving.memo}
                    </p>
                )}
                <form action="/saving/update" method='POST'>
                    <input type="hidden" name="_token" value={csrfToken.current} />
                    <input type="hidden" name="id" value={saving.id} />
                    <input type="hidden" name="user_id" value={user.id} />
                    <input type="hidden" name="category" value={1} />
                    <input type="hidden" name="goal_id" value={saving.id ?? ''} />
                    <input type="hidden" name="deadline" value={formattedDate} />

                    <div className='relative w-full h-auto mt-2'>
                        <StatusBar
                            size="large"
                            total={saving.amount}
                            amount={statusBarAmount}
                        />
                        <p className='absolute top-1/2 right-2 translate-y-[-50%] z-10 flex items-center justify-center gap-1 text-primary font-bold mix-blend-difference'>
                            <PriceConvert price={statusBarAmount} />/<PriceConvert price={saving.amount} />
                        </p>
                    </div>

                    <InputButtons
                        inputName="amount"
                        className='mt-8'
                        onChange={handlePriceChange}
                        onSave={handleSave}
                    />
                </form>
            </div>
    </AuthenticatedLayout>
    );
}
