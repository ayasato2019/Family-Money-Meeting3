import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import UserImage from '@/Components/UserAvatar';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Method } from '@inertiajs/core';
import { UserTypes } from '@/types/tableUserData';

interface AuthenticatedProps {
    header?: ReactNode;
}

// チームメンバーの型定義
interface TeamMember {
    id: number;
    name: string;
    role: number;
    avatar: number | null;
}

interface CustomPageProps extends PageProps {
    team_id: number | null;
    team_name: string | null;
    team_members: TeamMember[];
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<AuthenticatedProps>) {
    const { auth, role, team_id, team_name, team_members } = usePage<CustomPageProps>().props;
    const user = auth?.user || null;
    const safeTeamId: number = team_id ?? 0;
    const teamMembers: TeamMember[] = (team_members ?? []) as TeamMember[];

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // 共通メニューリスト
    const menuLinks = [
        { label: 'プロフィール', route: 'profile.edit', className: 'break-keep' },
        // ...(team_id ? [{ label: 'メンバーリスト', route: 'teams-member', className: 'break-keep' }] : []),
        { label: 'ステータス', route: 'status-create', className: 'break-keep' },
        { label: 'チーム', route: 'teams-create', className: 'break-keep' },
        { label: 'ログアウト', route: 'logout', method: 'post' as Method, as: 'button', className: '!w-auto mx-auto border border-transparent rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 md:hidden' }
    ];

    return (
        <div className="flex min-h-screen max-w-6xl mx-auto md:mr-5 lg:mr-0 ">
            {/* Left Sidebar (デスクトップ用) */}
            <div className="w-64 mt-16 p-4 hidden md:block" aria-hidden={!showingNavigationDropdown}>
                <nav className="space-y-2">
                    {menuLinks.map((link) => (
                        <ResponsiveNavLink
                            key={link.route}
                            href={route(link.route)}
                            method={link.method}
                            as={link.as}
                            className={link.className }
                        >
                            {link.label}
                        </ResponsiveNavLink>
                    ))}
                </nav>
            </div>

            {/* Middle Content */}
            <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative mx-auto lg:px-8 bg-gradation rounded-b-3xl flex justify-between">
                    <Link className='py-2 px-4 lg:px-0' href={route('dashboard')}>
                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                    </Link>

                    <div className="flex items-center gap-2 p-4 lg:px-0">
                        <Link
                            className='hidden md:flex'
                            href={route('profile.edit')}>
                            <div className="text-base font-medium text-gray-800  items-center gap-2">
                                <UserImage />
                            </div>
                        </Link>

                        {/*  ハンバーガーメニュー */}
                        <div className="relative z-50 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="inline-flex items-center justify-center rounded-md text-white transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-2 focus:online-primary-500"
                                aria-expanded={showingNavigationDropdown}
                                aria-controls="mobile-menu"
                            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className="h-6 w-6 fill-white"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg></button>
                        </div>
                    </div>
                </div>

                <main>
                {header && (
                    <header className="bg-white">
                        <div className="mx-auto max-w-3xl px-4 pt-2 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                    {children}
                </main>
            </div>

            {/*  SP, md 以下で表示されるナビゲーション */}
            <div id="mobile-menu" className={`absolute top-0 px-4 pt-16 pb-4 left-0 z-40 w-full shadow-md transition-all duration-300 bg-primary-100 ${showingNavigationDropdown ? 'block' : 'hidden'} lg:hidden`} aria-hidden={!showingNavigationDropdown}>
                <div className="py-3 border-b-2 border-t-2 flex justify-center items-center">
                    <div className="text-base font-bold flex items-center gap-2 w-auto mx-auto">
                        {user.name}
                    </div>
                </div>
                <nav className="space-y-1">
                    {menuLinks.map((link) => (
                        <ResponsiveNavLink
                            key={link.route}
                            href={route(link.route)}
                            method={link.method}
                            as={link.as}
                            className={link.className}
                        >
                            {link.label}
                        </ResponsiveNavLink>
                    ))}
                </nav>
                {/* チームメンバー一覧 */}
                <div className="w-full bg-gray-50/60 rounded-xl p-4 mb-4">
                    <div className="w-full h-full ">
                        <div className="relative">
                            <h2 className='text-center font-bold'>メンバー</h2>
                            <Link className='absolute right-0 top-0 group pl-1 ml-auto flex items-center justify-center w-7 h-7 border-2 border-dashed border-gray-600 rounded-full hover:border-orange-500 hover:border-solid hover:scale-110 transition-all' href={route('teams-member')}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={18} height={18} className="fill-gray-600 group-hover:fill-orange-500 transition-all"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg></Link>
                        </div>

                        <ul className='my-5 flex flex-col gap-2'>
                        {team_members.length > 0 ? (
                            <>
                                {team_members.map((member) => (
                                    <li key={member.id} className='flex items-center gap-2'>
                                        <UserImage userId={member.id} />
                                        <p className='leading-none'>{member.name}</p>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <li>現在メンバーはいません。</li>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
             {/* Right Sidebar */}
            <div className="w-1/3 max-w-80 mt-16 p-4 hidden lg:block">
                {/* チームメンバー一覧 */}
                <div className="w-full bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="w-full h-full ">
                        <div className="relative">
                            <h2 className='text-center font-bold'>メンバー</h2>
                            <Link className='absolute right-0 top-0 group pl-1 ml-auto flex items-center justify-center w-7 h-7 border-2 border-dashed border-gray-600 rounded-full hover:border-orange-500 hover:border-solid hover:scale-110 transition-all' href={route('teams-member')}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={18} height={18} className="fill-gray-600 group-hover:fill-orange-500 transition-all"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg></Link>
                        </div>
                        <ul className='my-5 flex flex-col gap-2'>
                        {team_members.length > 0 ? (
                            <>
                                {team_members.map((member) => (
                                    <li key={member.id} className='flex items-center gap-2'>
                                        <UserImage userId={member.id} />
                                        <p className='leading-none'>{member.name}</p>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <li>現在メンバーはいません。</li>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
