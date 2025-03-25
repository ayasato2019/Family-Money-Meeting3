export const COMMENT_TARGET_TYPE = {
    household: 0,
    saving: 1,
    investment: 2,
    need: 3,
    want: 4,
    donation: 5,
    status: 6,
  } as const;

  export type CommentTargetType = keyof typeof COMMENT_TARGET_TYPE;
