import { useState } from "react";
import UserStatusName from '@/Components/UserStatusName';
import UserStatusAmount from '@/Components/UserStatusAmount';


export default function UserStatus({
    useName,
    savings,
    investment,
    essential,
    extravagance,
    plannedExtravagance,
    donation,
    level,
}: {
    useName: string;
    savings: number;
    investment: number;
    essential: number;
    extravagance: number;
    plannedExtravagance: number;
    donation: number;
    level: number;
}) {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className='absolute left-0 w-full h-10 z-50 transition-all duration-300 top-0'>
            <div className="relative w-full h-full">
                <UserStatusName
                donation={donation}
                level={level}
                useName={useName}
                ></UserStatusName>
                <div
                    onClick={handleOpen}
                    // onTouchStart={handleOpen}
                    className={`absolute right-0 w-1/2 flex items-stert justify-end transition-all duration-300 ${isOpen ? 'top-0' : 'top-[-60px]'
                    }`}>
                    <UserStatusAmount
                        isOpen={isOpen}
                        savings={savings}
                        investment={investment}
                        essential={essential}
                        extravagance={extravagance}
                        plannedExtravagance={plannedExtravagance}
                        donation={donation}
                        />
                </div>
            </div>
        </div>
    )
}
