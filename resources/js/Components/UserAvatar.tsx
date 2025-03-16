import { usePage } from '@inertiajs/react';

export default function UserAvatar({
    initialImage = null,
    allowUpload = true, // アップロードを許可するかどうかを制御する
}: {
    initialImage?: string | null;
    allowUpload?: boolean; // ファイルアップロードの有効/無効を制御
}) {
    const page = usePage();
    const user_avatar = typeof page.props.avatar === "string" ? page.props.avatar : "avatar_child_1.webp";

    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/build/assets/images/avatar/${user_avatar}`;

    return (
        <div className="overflow-hidden h-8 w-8 rounded-full ">
            <img
                src={imageUrl}
                alt="Avatar"
                className="h-full w-full object-cover object-top scale-150"
            />
        </div>
    );
}
