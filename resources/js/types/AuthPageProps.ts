import { PageProps } from '@inertiajs/core';
import { UserTypes } from '@/types/tableUserData';
import { StatusTypes } from '@/types/tableStatusData';

export interface AuthPageProps {
    auth: {
        user: UserTypes & {
            role: number;
            team_id: number;
            email: string;
            avatar: number | null;
        };
    };
    team_id: number | null;
    statuses?: Record<number, StatusTypes>;
    [key: string]: any;
}

