import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({
    role,
}: {
    role: number;
}) {
    const user = usePage().props.auth.user;
    const team_id = (user as any).team_id;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">マイページ</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route('teams-create')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >チーム作成</Link>
                        </div>

                        {team_id !== null ? (
                            <div className="p-6 text-gray-900">
                                <Link
                                    href={route('teams-member')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >{role === 10 ? (
                                    <span>メンバー追加</span>
                                ) : (
                                    <span>メンバーリスト</span>
                                )}
                                </Link>
                            </div>
                        ) : (
                            <p>チーム名を登録したらメンバーを追加できます。</p>
                        )}
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route('status-create')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >ステータス</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
