import UserStatus from '@/Components/UserStatus';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import LineChart from "@/Objects/Chart";

//タイプチェック
import { UserTypes } from "@/types/tableUserData";
import { StatusTypes } from '@/types/tableStatusData';
// import { ChartTypes } from '@/types/tableChartData';

interface CustomPageProps extends PageProps {
    auth: {
        user: UserTypes;
    };
    statuses?: Record<number, StatusTypes>;
    avatar?: string;
}

export default function FarstViewAvatar({
    category,
    // chartData
}: {
    category: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    // chartData?: ChartTypes,
}) {

    const { auth, avatar, statuses } = usePage<CustomPageProps>().props;
    const fvImages = avatar ? avatar : "";

    const user = auth.user;
    if (!user) {
        return <div>ユーザー情報が取得できません</div>;
    }
    const status = statuses?.[user.id] ?? {} as StatusTypes;

    const categoryColor = {
        0: 'primary',
        1: 'blue',
        2: 'pink',
        3: 'green',
        4: 'orange',
        5: 'gray',
        6: 'yellow',
    }[category];

    // ユーザー情報の宣言
    const userSaving: number = status?.saving ?? 0;
    const userInvestment: number = status?.investment ?? 0;
    const userNeed: number = status?.need ?? 0;
    const userWant: number = status?.want ?? 0;
    const userDonation: number = status?.donation ?? 0;

    // ステータス
    const userData: UserTypes & StatusTypes = {
        ...user,
        ...status,
        game_level: 1,  // 仮の値
        game_life: 4,  // 仮の値
    };

    const ImagesFv = () => {
        switch (category) {
            case 0: // 'Home' カテゴリの場合
                return <div>ホーム画面</div>;
            case 1: // 'Saving' カテゴリの場合
                return <div>貯金のグラフ</div>;// className='w-full max-w-full h-full object-cover object-center'
            case 2: // 'Investments' カテゴリの場合
                return <div>投資のグラフ</div>;
            case 3: // 'Need' カテゴリの場合
                return <div>必要のグラフ</div>;
            case 4: // 'Want' カテゴリの場合
                return <div>欲しいのグラフ</div>;
            case 5: // 'Donations' カテゴリの場合
                return <div>寄付のグラフ</div>;
            case 6: // Household' カテゴリの場合
                return <div>家計簿のグラフ</div>;
            default:
                return null;
        }
    };


    // 寄付レベルで背景も変化
    const donationTotal = userDonation;
    let donationLavel: number = donationTotal
    let userBg = "";
    if (donationTotal < 1000) {
        donationLavel = 1;
        userBg = '1';
    } else if (donationLavel < 2000) {
        donationLavel = 2;
        userBg = '2';
    } else if (donationLavel < 3000) {
        donationLavel = 3;
        userBg = '3';
    } else if (donationLavel < 4000) {
        donationLavel = 4;
        userBg = '4';
    } else if (donationLavel < 5000) {
        donationLavel = 5;
        userBg = '5';
    }
    const plannedExtravagance: number = userData.want;
    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/build/assets/images/bg/bg_${userBg}.webp`;

    return (
        <div className="relative overflow-hidden aspect-video bg-slate-50 min-h-80 w-full max-w-full mt-2 rounded-lg">
            <UserStatus
                useName={userData.name}
                donation={userData.donation}
                level={userData.game_level}
                savings={userData.saving}
                investment={userData.investment}
                essential={userData.need}
                extravagance={userData.want}
                plannedExtravagance={plannedExtravagance}
            />
            <div
                style={{ backgroundImage: `url(${imageUrl})` }}
                className={`overflow-hidden relative bg-${categoryColor} w-full h-full bg-center bg-cover min-h-80`}>
                <div className='overflow-hidden absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full object-cover object-center flex items-center justify-center'>
                    {ImagesFv()}
                </div>
            </div>
        </div>
    );
}
