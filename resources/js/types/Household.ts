
export interface HouseholdTypes {
    id: number;
    team_id: number;
    title: string;
    price: number;
    date: string;
    is_share: boolean;
    images?: string | null;
    memo?: string | null;
    comment_id?: number | null;
    created_at: string
}
