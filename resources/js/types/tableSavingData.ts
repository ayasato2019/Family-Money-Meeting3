import { Key } from "react";

export interface SavingTypes {
    saving_id: Key | null | undefined;
    id: number;
    user_id: number;
    goal_id: number;
    title: string;
    amount: number;        // 小数点を含む金額
    deadline: string;          // 日付 (ISO 8601形式推奨)
    level: number;
    images?: string | null;       // URL形式
    is_shared: boolean;
    memo?: string | null;      // memoをnullableに対応
    comment_id: number | null;  // nullable対応
}
