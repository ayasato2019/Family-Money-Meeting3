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
            className={"flex gap-1 border border-gray-300 rounded-md px-8 py-4 text-gray-700 ring-1 ring-transparent transition hover:text-gray-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white" + className}
        >
            {children}
        </Link>
    );
}
