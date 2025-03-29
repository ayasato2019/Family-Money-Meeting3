import { usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FarstView from '@/Objects/FarstView';
import TitleSection from '@/Components/TitleSection';
import ConvertPrice from '@/Components/Price/PriceConvert';

// 型チェック
import { StatusTypes } from '@/types/tableStatusData';
import { SavingTypes } from '@/types/tableSavingData';
import { HistoryTypes } from '@/types/tableHistoryData';
import { UserTypes } from '@/types/tableUserData';

// 型定義
interface PageProps {
    auth: {
        user: UserTypes & { role: number; team_id: number };
    };
    statuses?: Record<number, StatusTypes>;
    savings?: SavingTypes[];
    histories?: HistoryTypes[];
}

export default function SavingList() {
    // 画面タイトル
    const pagetitle = "ちょきん";

    // 型を明示的にキャストして取得
    const { auth, statuses, savings, histories } = usePage().props as unknown as PageProps;

    // ユーザー情報取得
    const user = auth.user;

    // ステータス取得 (存在しない場合はエラー表示)
    const status = statuses?.[user.id] ?? null;
    if (!status || !savings) {
        return (
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="flex items-center justify-center gap-2 w-full h-screen">
                        <Link
                            href={route('status-create')}
                            className='flex items-center justify-center rounded-md border border-transparent bg-gradation max-w-52 px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation'>
                            初回登録した？
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 自分の貯金データのみ取得
    const userSavings = savings.filter((saving) => saving.user_id === user.id);

    // 必要な情報を統合
    const userDataAfter: UserTypes & StatusTypes = {
        ...user,
        ...status,
        game_level: 1,  // 仮の値
        game_life: 4,  // 仮の値
    };

    return (
        <AuthenticatedLayout header={<h1 className="w-full flex items-center justify-center text-xl font-semibold leading-tight text-gray-800">{pagetitle}</h1>}>
                        <Head title={pagetitle} />

            <FarstView category={1} />

            <div className="overflow-hidden flex items-center justify-center w-full h-full">
                <div className="contents_box w-full">
                    <div className="flex flex-col gap-8">
                        <section className="py-5 md:py-10">
                            <TitleSection category="Savings" num={userSavings.length} />
                            <Link
                                href={route('saving-create')}
                                className="flex items-center justify-center rounded-md border border-transparent bg-gradation max-w-52 px-4 py-2 max-h-10 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gradation-blue focus:bg-gradation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-gradation icon-plus mx-auto mt-5 gap-2"
                            >
                                もくひょうをついか
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={12} height={12}>
                                    <path fill="#FFF" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                                </svg>
                            </Link>

                            {/* 貯金リストを表示 */}
                            {userSavings.map((savingItem) => (
                                <div key={savingItem.id} className="mt-5">
                                    {/* 貯金目標を追加ボタン */}

                                    <Link
                                        href={route('saving-show', { id: savingItem.id })                                    }
                                        className="flex flex-col gap-0 border py-2 px-4 rounded-lg">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-base">{savingItem.title}</span>
                                            <ConvertPrice
                                                price={savingItem.amount}
                                            />
                                        </div>
                                        <span className="flex w-full text-sm text-gray-500">{savingItem.deadline}</span>
                                    </Link>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
