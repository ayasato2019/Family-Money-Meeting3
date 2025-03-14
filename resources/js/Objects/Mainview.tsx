"use client"
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import FarstView from '@/Ui/FarstViewAvatar';

// 型チェック
import { StatusTypes } from '@/types/tableStatusData'
import { HistoryTypes } from '@/types/tableHistoryData'
import { UserTypes } from '@/types/tableUserData'

interface CustomPageProps extends PageProps {
    auth: {
        user: UserTypes & {
            role: string;
            team_id: number;
            email: string;
        };
        [key: string]: any;
    };
}

export default function MainView() {
    const { auth } = usePage<CustomPageProps>().props;

    //ステータスの確認
    const { statuses } = usePage().props as {
        statuses?: Record<number, StatusTypes>,
    };
    console.log(statuses);
    const user = auth.user;
    if (!user) {
        return <div>ユーザー情報が取得できません</div>;
    }
    const status = statuses?.[user.id] ?? null;


    // ユーザー情報の宣言
    const userSaving: number = status?.saving ?? 0;
    const userInvestment: number = status?.investment ?? 0;
    const userNeed: number = status?.need ?? 0;
    const userWant: number = status?.want ?? 0;
    const userDonation: number = status?.donation ?? 0;

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

    const userDataAfter: UserTypes = {
        id: user.id,
        name: user.name,
        savings: userSaving,
        investment: userInvestment,
        need: userNeed,
        want: userWant,
        donation: userDonation,
        game_level: 1,  // 仮の値
        game_life: 4,  // 仮の値
    };

    const userAvatar = "";
    const userBg = "";

    return (
        <div className='overflow-hidden h-full w-[calc(100%-2rem)] mx-auto'>
            <div className="bg-[''] bg-center w-full h-full">
            <FarstView
                UserData={userDataAfter}
                category={1}
                fvImages={userAvatar}
                />
            </div>
        </div>
    )
}
