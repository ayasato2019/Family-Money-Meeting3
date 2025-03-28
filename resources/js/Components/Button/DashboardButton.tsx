import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

export default function DashboardButton({
    className = '',
    href = '',
    children,
    ...props
}: {
    className?: string,
    href: string,
    children: ReactNode,
}) {
    return (
        <Link
        {...props}
            href={route(href)}
            className={"flex gap-1 flex-col border border-gray-300 rounded-md px-8 py-4 w-full text-gray-700 ring-1 ring-transparent transition hover:text-gray-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white" + className}
        >
            <div className="flex gap-10 justify-between items-center">
                <h2 className="flex gap-1">{children}</h2>
                <p className='text-gray-600 text-xs before:content-["-"]'>もっと見る</p>
            </div>
        </Link>
    );
}
