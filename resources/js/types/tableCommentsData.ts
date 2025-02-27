export type CommentsTypes = {
    comment_id: number;
    user_id: number;
    goal_group_id?: number;  // 関連する項目のID
    category: number;
    comment_text: string;
    created_at: string;  // ISO 8601形式の日付文字列
}
