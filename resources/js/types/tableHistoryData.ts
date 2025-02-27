export interface HistoryTypes {
    history_id: number;
    user_id: number;
    comment_id?: number | null;
    category: number;
    goal_group_id: number;
    amount_saved: number;
    memo_images?: string | null;
    date_saved: string;
    is_shared: boolean;
    memo?: string | null;
    created_at: string;
};
