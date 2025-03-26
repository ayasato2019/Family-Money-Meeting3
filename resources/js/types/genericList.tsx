export interface LiatDataTypes {
    id: number;
    team_id: number;
    user_id: number;
    title: string;
    price: number;
    date: string;
    achieve: boolean;
    is_shared: number;
    images?: string | null;
    memo?: string | null;
    comment_id?: number | null;
    created_at?: string
}
