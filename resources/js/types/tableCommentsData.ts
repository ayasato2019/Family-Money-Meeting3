export type CommentsTypes = {
    id: number;
    team_id: number;
    user_id_from?: number;
    user_id_to: number;
    target_type:  0 | 1 | 2 | 3 | 4 | 5 | 6;
    target_id: number;
    comment: string;
    title?: string;
    date?: string;
};
