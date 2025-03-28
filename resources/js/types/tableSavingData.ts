import { Key } from "react";

export interface SavingTypes {
    id: number;
    user_id: number;
    goal_id: number;
    title: string;
    amount: number; // decimal(11,0) → number
    deadline: string; // MySQLの`date`はISO 8601形式の文字列
    achieve: boolean; // tinyint(1) → boolean
    level: number; // int unsigned
    images?: string | null; // varchar(255) (null許容)
    is_shared: number; // tinyint(1) → boolean
    comment_id: number | null; // bigint unsigned (null許容)
    memo?: string | null; // text (null許容)
}

