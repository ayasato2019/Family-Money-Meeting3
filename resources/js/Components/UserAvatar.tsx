import { usePage } from '@inertiajs/react';

export default function UserAvatar({
    userId = null,
    src = null,
    alt = "",
    className = "",
    allowUpload = true,
}: {
    userId?: number | null;
    src?: string | number  | null;
    alt?: string | null;
    className?: string | null;
    allowUpload?: boolean;
}) {
    const { props } = usePage();

    // `team_members` のデフォルト値を `[]` にする（エラー防止）
    const teamMembers = Array.isArray(props.team_members) ? props.team_members : [];

    // ユーザーのアバターを取得（null の場合デフォルトを設定）
    // const user_avatar = src ?? (props.auth?.user?.avatar ? `avatar_${props.auth.user.avatar}.webp` : "avatar_1.webp");
    let user_avatar = "";

    // アバターを取得
    if (userId === null) {
        user_avatar = props.auth?.user?.avatar ? `avatar_${String(props.auth.user.avatar)}.webp` : "avatar_1.webp";
    } else {
        const member = teamMembers.find((m) => m.id === userId);
        if (member?.avatar) {
            user_avatar = `avatar_${member.avatar}.webp`;
        }
    }

    // アバター画像の URL を構築
    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/storage/images/avatar/${user_avatar}`;

    return (
        <div className={`overflow-hidden h-8 w-8 rounded-full ` + className}>
            <img
                src={imageUrl}
                alt={alt || "Avatar"}
                className={`h-full w-full object-cover object-top scale-150`}
            />
        </div>
    );
}
