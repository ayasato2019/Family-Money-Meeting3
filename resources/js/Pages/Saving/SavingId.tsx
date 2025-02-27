import { useState, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import TitleSavings from '@/Components/TitleSavings';
import ConvertPrice from '@/Components/ConvertPrice';
import StatusBar from '@/Components/StatusBarLarge';
import InputButtons from '@/Components/InputButtons';
import FarstView from '@/Ui/FarstViewAvatar';
import { openToggle } from '@/Functions/openToggle';
// 型チェック
import { StatusTypes } from '@/types/tableStatusData'
import { SavingTypes } from '@/types/tableSavingData'

interface HistoryTypes {
    history_id: number;
    user_id: number;
    comments_id: number;
    category: number;
    goal_id: number;
    amount_saved: number;
    memo_images: string;
    date: string;
    memo: string;
    at_create: string;
};

export default function SavingId() {
    const user = usePage().props.auth.user;

    //ステータスの確認
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

    // savingsがオブジェクトでそのまま渡されている場合
    type SavingType = {
        deadline: string | number | Date;
        id: number;
        user_id: number;
        comment_id: number | null;  // nullable対応
        goal_id: number;
        title: string;
        amount: number;        // 小数点を含む金額
        level: number;
        images?: string | null;       // URL形式
        is_shared: boolean;
        memo?: string | null;
    }
    const savingsArray = Object.values(savings);


    // 履歴の確認
    const { histories } = usePage().props as {
        histories?: HistoryTypes[],
    };


    const saving: SavingType = {
        id: savings.id,
        user_id: savings.user_id,
        comment_id: savings.comment_id,
        goal_id: savings.goal_id,
        title: savings.title,
        amount: savings.amount,
        deadline: savings.deadline,
        level: savings.level,
        images: savings.images,
        is_shared: savings.is_shared,
        memo: savings.memo
    };
    console.log("saving.id->" + saving.id);
    console.log("saving.user_id->" + saving.user_id);
    console.log("saving.comment_id->" + saving.comment_id);
    console.log("saving.goal_id->" + saving.goal_id);
    console.log("saving.title->" + saving.title);
    console.log("saving.amount->" + saving.amount);
    console.log("saving.level->" + saving.level);
    console.log("saving.images->" + saving.images);
    console.log("saving.is_shared->" + saving.is_shared);
    console.log("saving.memo->" + saving.memo);
    // 情報がない時はすぐ確認できる
    if (!status || !histories || !saving) {
        return (
            <div>
                <p>ステータスが見つかりません。</p>
            </div>
        );
    }
    // ユーザー情報の宣言
    const userSaving: number = status.saving;
    const userInvestment: number = status.investment;
    const userEssential: number = status.essential;
    const userExtravagance: number = status.extravagance;
    const userDonation: number = status.donation;

    // 積立額の計算
    const calculateTotalSavings = (savingsId: number, histories: HistoryTypes[], goalGroupId: number): number => {
        return histories
            .filter((history) => history.goal_id === savingsId) // goal_id でフィルタリング
            .map((history) => parseFloat(String(history.amount_saved))) // amount_saved を数値に変換
            .reduce((total, amount) => total + amount, 0); // 合計を計算
    };

    // 必要なstateとuseEffectの配置
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [savedPrice, setSavedPrice] = useState<number>(0);

    // 入力値の変更をハンドル
    const handlePriceChange = (newPrice: number) => {
        setCurrentPrice(newPrice);
    };

    // 状態管理
    const [statusBarAmount, setStatusBarAmount] = useState<number>(
        calculateTotalSavings(saving.id, histories, saving.level)
    );

    const handleSave = (newAmount: number) => {
        const updatedAmount =
            newAmount + calculateTotalSavings(saving.goal_id, histories, saving.level);
        setSavedPrice(updatedAmount);
        setStatusBarAmount(updatedAmount);
    };

    const donationTotal = userDonation;
    let donationLavel: number = donationTotal
    if (donationTotal < 1000) {
        donationLavel = 1;
    } else if (donationLavel < 2000) {
        donationLavel = 2;
    } else if (donationLavel < 3000) {
        donationLavel = 3;
    } else if (donationLavel < 4000) {
        donationLavel = 4;
    } else if (donationLavel < 5000) {
        donationLavel = 5;
    }

    const userDataAfter = {
        id: user.id,
        name: user.name,
        savings: userSaving,
        investment: userInvestment,
        essential: userEssential,
        extravagance: userExtravagance,
        planned_extravagance: userDonation,
        level: donationLavel,
        donation: userDonation,
        avatar: "https://borderlesss.sakura.ne.jp/ss1/assets/images/photo-noimages.jpg",
    };
    const userAvatar: string = userDataAfter.avatar;

    // タイトルクリックで開閉を管理するための状態
    const { openIndexes, handleToggle } = openToggle();

    // 時間の修正
    const date = new Date(saving.deadline);  // 日付文字列をDateオブジェクトに変換
    const formattedDate = date.toISOString().split('T')[0];  // ISO形式で取り出して、Tの前（年月日）だけ取得

    //送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='overflow-hidden flex items-center justify-center w-full h-full'>
            <div className='contents_box overflow-auto flex flex-col gap-5 pb-5 w-full md:max-w-[64vmin] h-screen md:border-solid border-0 md:border-8 md:border-black md:rounded-2xl '>
                <FarstView
                    UserData={userDataAfter}
                    category={1}
                    fvImages={userAvatar}
                />

                <div className='flex flex-col gap-5'>
                    <ul className='px-4'>
                        <li>
                            <div>
                                <p className='text-sm font-semibold'>{formattedDate}</p>
                                <TitleSavings
                                    type={1}
                                    title={saving.title}
                                    />
                                    {saving.memo !== null ? (
                                        <p className="my-4 text-center text-sm"><span className='inline-block bg-slate-600 text-white rounded-2xl py-0 px-2 mr-1 font-bold'>メモ</span>{saving.memo}</p>
                                ) : ''}
                                <form action="./update" method='POST'>
                                    <input type="hidden" name="_token" value={csrfToken.current} />
                                    <input type="hidden" name="user_id" value={user.id} />
                                    <input type="hidden" name="category" value={1} />
                                    <input type="hidden" name="goal_id" value={saving.id} />
                                    <input type="hidden" name="date" value={today} />
                                    <input type="hidden" name="id" value={saving.id} />

                                    <div className='relative w-full h-auto mt-2'>
                                        <StatusBar
                                            size="large"
                                            total={saving.amount}
                                            amount={statusBarAmount}
                                        />
                                        <p
                                            className='absolute top-1/2 right-2 translate-y-[-50%] z-10 flex items-center justify-center text-primary font-bold mix-blend-difference'>
                                            <ConvertPrice
                                                price={statusBarAmount}
                                            />/<ConvertPrice
                                                price={saving.amount}
                                            />
                                        </p>
                                    </div>

                                    <InputButtons
                                        inputName="amount_saved"
                                        className='mt-5'
                                        onChange={handlePriceChange} // 入力値変更時に実行
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
        </div >
    );
}
