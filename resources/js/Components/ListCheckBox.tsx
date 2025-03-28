import { useState, useEffect } from 'react';
import TitleCheckBox from '@/Components/TitleCheckBox';
import ConvertPrice from '@/Components/ConvertPrice';
import { ListCheckBoxTypes } from '@/types/listCheckBox';
// import { DateConvert } from '../Functions/DateConvert';

// ListCheckBox コンポーネントの定義
export default function ListCheckBox({
    ListItems,
    className
}: {
    ListItems: ListCheckBoxTypes[],
    className?: string,
}
) {
    const [items, setItems] = useState<ListCheckBoxTypes[]>([]);

    useEffect(() => {
        const updatedItems = ListItems.map(item => ({
            ...item,
            type: item.type || 3, // type が無ければ 3 を設定
        }));
        setItems(updatedItems);
    }, [ListItems]); // ListItems が変更されたときに再実行

    return (
        <ul className={'flex flex-wrap items-stretch justify-start gap-1' + className}>
            {items.map((item) => (
                <li
                    key={item.ID}
                    className="relative overflow-hidden flex justify-start items-center gap-4 h-auto w-full"
                >
                    <p className="text-xs text-white">{item.deadline}</p>
                    <TitleCheckBox
                        title={item.title}
                        type={item.type}
                        className="text-sm"
                    />
                    <div className="flex items-end">
                        <p className="font-bold"></p>
                        <ConvertPrice price={item.price} />
                    </div>
                </li>
            ))}
        </ul>
    );
}
