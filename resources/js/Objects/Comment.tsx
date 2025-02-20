import UserAvatar from '@/Components/UserAvatar';

export default function Household({
    className,
    // commentsText,
}: {
    className?: string;
    // commentsText: string;{*{commentsText}*}
}) {
    return (
        <div className={`flex items-center justify-end ${className || ''}`}>
            <div className="relative inline-flex justify-center py-1 px-2 min-w-8 min-h-8 rounded-3xl bg-gray-200 dark:text-black mr-5 before:content-[''] before:absolute before:bottom-4 before:w-0 before:h-0 before:border-solid before:border-t-transparent before:border-b-transparent before:border-r-gray-300 before:-right-[7px] before:top-[calc(50%-5px)] before:border-t-4  before:border-r-0  before:border-b-4  before:border-l-8 "></div>
            <UserAvatar allowUpload={false} />
        </div>
    );
}
