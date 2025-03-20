import { PageProps } from '@inertiajs/core';
import { UserTypes } from '@/types/tableUserData';
import { StatusTypes } from '@/types/tableStatusData';

export interface AuthPageProps {
    auth: {
        user: UserTypes & {
            // role: string;
            team_id: number;
            email: string;
            avatar: number | null;
        };
    };
    statuses?: Record<number, StatusTypes>;
    [key: string]: any;
}

