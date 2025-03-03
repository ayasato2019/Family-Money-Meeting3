export interface HistoryTypes {
    history_id: number;
    user_id: number;
    goal_id: number;
    comment_id?: number | null;
    category: number;
    amount: number;
    deadline: string;
    images?: string | null;
    is_shared: boolean;
    memo?: string | null;
};
