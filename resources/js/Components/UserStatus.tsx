import { useState } from "react";
import UserStatusName from '@/Components/UserStatusName';
import UserStatusAmount from '@/Components/UserStatusAmount';


export default function UserStatus({
    useName,
    savings,
    investment,
    need,
    want,
    donation,
    level,
}: {
    useName: string;
    savings: number;
    investment: number;
    need: number;
    want: number;
    donation: number;
    level: number;
}) {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className='absolute top-2 left-2 w-[calc(100%-16px)] h-8 z-10 transition-all duration-300'>
            <div className="relative w-full h-full">
                <UserStatusName
                donation={donation}
                level={level}
                useName={useName}
                ></UserStatusName>
                <div
                    onClick={handleOpen}
                    // onTouchStart={handleOpen}
                    className={`absolute right-0 w-1/2 flex items-stert justify-end transition-all duration-300 ${isOpen ? 'top-0' : 'top-[-74px]'
                    }`}>
                    {/* <UserStatusAmount
                        isOpen={isOpen}
                        savings={savings}
                        investment={investment}
                        need={need}
                        want={want}
                        donation={donation}
                        /> */}
                </div>
            </div>
        </div>
    )
}
