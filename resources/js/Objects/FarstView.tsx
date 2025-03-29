import UserStatus from '@/Components/UserStatus';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

//タイプチェック
import { UserTypes } from "@/types/tableUserData";
import { StatusTypes } from '@/types/tableStatusData';

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

    const { auth, statuses } = usePage<CustomPageProps>().props;

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

    // ステータス
    const userData: UserTypes & StatusTypes = {
        ...user,
        ...status,
    };

    const saving = userData.saving ?? 0;
    const investment = userData.investment ?? 0;
    const need = userData.need ?? 0;
    const want = userData.want ?? 0;
    const donation = userData.donation ?? 0;
    const level = userData.game_level ?? 0;
    const useName = userData.name ?? "";


    const ImagesFv = () => {
        switch (category) {
            case 0: // 'Home' カテゴリの場合
                return <div></div>;
            case 1: // 'Saving' カテゴリの場合
                return <div></div>;// className='w-full max-w-full h-full object-cover object-center'
            case 2: // 'Investments' カテゴリの場合
                return <div></div>;
            case 3: // 'Need' カテゴリの場合
                return <div></div>;
            case 4: // 'Want' カテゴリの場合
                return <div></div>;
            case 5: // 'Donations' カテゴリの場合
                return <div></div>;
            case 6: // Household' カテゴリの場合
                return <div></div>;
            default:
                return null;
        }
    };

    // 寄付レベルで背景も変化
    const donationTotal =userData.donation;
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
    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/storage/images/bg/bg_${userBg}.webp`;

    return (
        <div className="relative overflow-hidden aspect-video bg-slate-50 min-h-80 w-full max-w-full mt-2 rounded-lg">
            <UserStatus
                useName={userData.name}
                donation={userData.donation}
                level={userData.game_level}
                savings={userData.saving}
                investment={userData.investment}
                need={userData.need}
                want={userData.want}
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
