import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FarstView from '@/Ui/FarstViewAvatar'
import ButtonPrimary from '@/Components/ButtonPrimary';
import TitleSection from '@/Components/TitleSection';
import ListSavings from '@/Components/ListSaving';

// import TopSaving from '@/Ui/TopSaving'

// 型チェック
import { StatusTypes } from '@/types/tableStatusData'
import { HistoryTypes } from '@/types/tableHistoryData'
import { SavingTypes } from '@/types/tableSavingData'
import { UserTypes } from '@/types/tableUserData'

export default function SavingList({
    // saviving,
    // history,
}: {
    // savibg: SavingTypes[],
    // history: HistoryTypes[],
}) {
    //ユーザーの確認
    const user = usePage().props.auth.user;

    //ステータスの確認
    const { statuses } = usePage().props as {
        statuses?: Record<number, StatusTypes>,
    };
    const status = statuses?.[user.id] ?? null;

    // 貯金目標の確認
    const { savings } = usePage().props as {
        savings?: SavingTypes[],
    };

    // 履歴の確認
    const { histories } = usePage().props as {
        histories?: HistoryTypes[],
    };

    if (!status || !savings) {
        return (
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex items-center justify-center gap-2 w-full h-screen">
                        <Link
                            href={route('status-create')}
                            className='flex items-center justify-center rounded-md border border-transparent bg-gradation min-w-32 max-w-52 px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation'>
                            初回登録した？
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const saving = Array.isArray(savings) ? savings.filter((saving) => saving.user_id === user.id) : [];
    const history = Array.isArray(histories) ? histories.filter((history) => history.user_id === user.id) : [];

    // もしも履歴がゼロだったら

    // ユーザー情報の宣言
    const userSaving: number = status.saving;
    const userInvestment: number = status.investment;
    const userNeed: number = status.need;
    const userWant: number = status.want;
    const userDonation: number = status.donation;
    const userGameLavel: number = status.game_level;
    const userLife: number = status.game_life;

    //Objectをカウントする時の式
    const savingsCount: number = saving.length;
    const historiesCount: number = histories ? histories.length : 0;

    const donationTotal = userDonation;
    // const donationTotal = history
    //     .filter((item) => item.category === 5)
    //     .reduce((total, item) => total + (item.amount_saved || 0), 0);
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
    const userDataAfter: UserTypes = {
        id: user.id,
        name: user.name,
        savings: userSaving,
        investment: userInvestment,
        need: userNeed,
        want: userWant,
        donation: userDonation,
        game_level: 1,  // 仮の値
        game_life: 100  // 仮の値
    };

    const userAvatar ="https://borderlesss.sakura.ne.jp/ss1/assets/images/photo-noimages.jpg";

    return (
        <>
            <Head title="貯金一覧" />
            <div className='overflow-hidden flex items-center justify-center w-full h-full'>
                <div className='contents_box overflow-auto flex flex-col gap-5 pb-5 w-full md:max-w-[64vmin] h-screen md:border-solid border-0 md:border-8 md:border-black md:rounded-2xl '>
                    <div className="flex flex-col gap-8">
                        <FarstView
                            UserData={userDataAfter}
                            category={0}
                            fvImages={userAvatar} />
                        <section className='py-5 md:py-10 px-2'>
                            <TitleSection category='Savings' num={savingsCount} />
                            {/* <TopSaving
                                num={savingsCount}
                                listData={savings}
                                historyData={history}
                                childPage={false}
                            /> */}
                            {
                                saving.map((savingItem) => (
                                    <div key={savingItem.id} className='mt-5'>
                                        <Link
                                            href={`./saving-${savingItem.id}`}
                                            className=''>
                                            {savingItem.title}
                                        </Link>
                                    </div>
                                ))
                            }

                            <Link
                                href="./saving_registration"
                                className='flex items-center justify-center rounded-md border border-transparent bg-gradation min-w-32 max-w-52 px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation icon-plus mx-auto mt-5 gap-2'>
                                もくひょうをついか
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={12} height={12}>
                                    <path fill='#FFF' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                                </svg>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
