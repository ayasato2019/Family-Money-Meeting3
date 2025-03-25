export type CommentsTypes = {
    id: number;
    user_id_from: number,
    user_id_to: number,
    target_type: number,
    target_id: number,
    comment: string;

    title?: string;
    date?: string;
};
