// src/functions/getComments.ts
import { CommentsTypes } from '@/types/tableCommentsData';

export const getComments = (compatible_id: number, commentsData: CommentsTypes[]): CommentsTypes[] => {
    return commentsData.filter((comment) => comment.comment_id === compatible_id);
};
