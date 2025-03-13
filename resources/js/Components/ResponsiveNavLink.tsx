import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-indigo-400 text-inhert focus:border-orange-600 focus:bg-indigo-100 focus:text-orange-600'
                    : 'border-transparent  hover:focus:text-orange-600'
            } text-base transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
