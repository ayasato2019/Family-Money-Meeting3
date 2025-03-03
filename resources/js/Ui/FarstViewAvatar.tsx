import UserStatus from '@/Components/UserStatus';

//タイプチェック
import { UserTypes } from '@/types/tableUserData';

export default function FarstViewAvatar({
    UserData,
    category,
    fvImages,
}: {
    UserData: UserTypes;
    fvImages: string;
    category: 0 | 1 | 2 | 3 | 4 | 5;

}) {

    const categoryColor = {
        0: 'primary',
        1: 'blue',
        2: 'pink',
        3: 'green',
        4: 'orange',
        5: 'gray',
    }[category];

    const ImagesFv = () => {
        switch (category) {
            case 0: // 'Home' カテゴリの場合
                return <img src={fvImages} width={80} height={160} />;
            case 1: // 'Saving' カテゴリの場合
                return <img src={fvImages}  width={2000} height={1000} className='w-full max-w-full h-full object-cover object-center' />;
            case 2: // 'Investments' カテゴリの場合
                return <div>Investments関連の情報を表示</div>;
            case 3: // 'NecessaryExpenses' カテゴリの場合
                return <div>必要経費に関する情報を表示</div>;
            case 4: // 'WastefulSpending' カテゴリの場合
                return <div>無駄遣いに関する情報を表示</div>;
            case 5: // 'Donations' カテゴリの場合
                return <div>寄付に関する情報を表示</div>;
            default:
                return null;
        }
    };

    const plannedExtravagance: number = UserData.want;

    return (
        <div className="relative overflow-hidden aspect-video bg-slate-50 min-h-80 w-full max-w-full">
            <UserStatus
                useName={UserData.name}
                donation={UserData.donation}
                level={UserData.game_level}
                savings={UserData.savings}
                investment={UserData.investment}
                essential={UserData.need}
                extravagance={UserData.want}
                plannedExtravagance={plannedExtravagance}
            />
            <div className={`overflow-hidden relative bg-${categoryColor} w-full h-full`}>
                <div className='overflow-hidden absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full object-cover object-center flex items-center justify-center'>
                    {ImagesFv()}
                </div>
            </div>
        </div>
    );
}
