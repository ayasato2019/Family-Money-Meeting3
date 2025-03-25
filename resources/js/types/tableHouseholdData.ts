export interface HouseholdTypes {
    id: number;
    team_id: number;
    user_id: number;
    title: string;
    price: number;
    date: string;
    achieve: boolean;
    is_shared: boolean;
    images?: string | null;
    memo?: string | null;
    comment_id?: number | null;
    created_at?: string
}
