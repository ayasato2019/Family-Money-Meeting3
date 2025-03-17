import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import UserImage from '@/Components/UserAvatar';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Method } from '@inertiajs/core';

interface AuthenticatedProps {
    header?: ReactNode;
}

interface TeamMember {
    name: string;
    id: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    team_id: number | null;
    teamMembers: TeamMember[];
}

interface CustomPageProps extends PageProps {
    auth: {
        user: User;
    };
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<AuthenticatedProps>) {
    const { auth } = usePage<CustomPageProps>().props;
    const user = auth.user;
    const team_id = user.team_id;
    const teamMembers: TeamMember[] = user.teamMembers || [];

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // 共通メニューリスト
    const menuLinks = [
        { label: 'プロフィール', route: 'profile.edit', className: 'break-keep' },
        ...(team_id ? [{ label: 'メンバーリスト', route: 'teams-member', className: 'break-keep' }] : []),
        { label: 'ステータス', route: 'status-create', className: 'break-keep' },
        { label: '新しいメンバー', route: 'teams-create', className: 'break-keep' },
        { label: 'ログアウト', route: 'logout', method: 'post' as Method, as: 'button', className: '!w-auto mx-auto border border-transparent rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 md:hidden' }
    ];

    return (
        <div className="flex min-h-screen max-w-6xl mx-auto">
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

                    <Link
                        className='py-2 px-4 hidden md:flex'
                        href={route('profile.edit')}>
                        <div className="text-base font-medium text-gray-800  items-center gap-2">
                            <UserImage />
                        </div>
                    </Link>

                    {/*  ハンバーガーメニュー */}
                    <div className="relative z-10 flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(prev => !prev)}
                            className="inline-flex items-center justify-center rounded-md p-4 lg:px-0 text-white transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-2 focus:online-primary-500"
                            aria-expanded={showingNavigationDropdown}
                            aria-controls="mobile-menu"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
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
            <div id="mobile-menu" className={`absolute top-0 pt-16 pb-4 left-0 w-full shadow-md transition-all duration-300 bg-primary-100 ${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden`} aria-hidden={!showingNavigationDropdown}>
                <div className="px-4 py-3">
                    <div className="text-base text-white font-bold flex items-center gap-2">
                        <UserImage />
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
            </div>
             {/* Right Sidebar */}
            <div className="w-80 mt-16 p-4 hidden lg:block">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="w-96 h-full ">
                        {/* チームメンバー一覧 */}
                        {teamMembers.length > 0 ? (
                            <>
                                <ul className='mb-5'>
                                    {teamMembers.map((member) => (
                                        <li key={member.id}>{member.name}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>現在メンバーはいません。</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
