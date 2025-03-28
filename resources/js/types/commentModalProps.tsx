export interface CommentModalProps {
    isCommentOpen: boolean;
    onCommentClose: () => void;
    listData: {
        user_id_to: number;
        user_id_from: number;
        target_type: number;
        target_id: number;
        id: number;
        comment_id: number;
        group_id: number;
        comment: string;
        title?: string;
        date?: string;
    } | null;
    onSubmit: (comment: {
        id: number;
        comment: string;
        target_id: number;
        target_type: number;
        user_id_to: number;
    }) => void;
}
