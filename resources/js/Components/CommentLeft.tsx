import UserAvatar from '@/Components/UserAvatar';

export default function CommentLeft({
    className,
    commentsText,
}: {
    className?: string;
    commentsText: string;
}) {
    return (
        <div className={`flex items-center justify-end ${className || ''}`}>
            <div className="balloon right">{commentsText}</div>
            <UserAvatar allowUpload={false} />
        </div>
    );
}
