import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface UserAvatarProps extends PageProps {
    user_avatar?: string;
}

export default function UserAvatar({
    initialImage = null,
    allowUpload = true, // アップロードを許可するかどうかを制御する
}: {
    initialImage?: string | null;
    allowUpload?: boolean; // ファイルアップロードの有効/無効を制御
}) {
    const user = usePage().props.auth.user;  // 型を明示的に指定
    const { user_avatar } = usePage<UserAvatarProps>().props;
    const appUrl = import.meta.env.VITE_APP_URL;

    return (
        <div className="overflow-hidden h-8 w-8 rounded-full">
            <img
                src={`${appUrl}/build/assets/images/${user_avatar}.png`}
                alt="Avatar"
                className='h-full w-full object-cover object-top scale-[2]'
            />
        </div>
    );
}
