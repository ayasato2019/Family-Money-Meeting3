import ConvertPrice from '@/Components/ConvertPrice';
import TitleSavings from '@/Components/TitleSavings';
import { DateConvert } from '@/Functions/DateConvert';
import { SavingTypes } from '@/types/tableSavingData';
import { HistoryTypes } from '@/types/tableHistoryData';
import { calculateMonthsDifference } from '@/Components/ConvertDate';

// Historyから積立金額の合計を算出する関数
const calculateTotalSavings = (savingsId: number, history: HistoryTypes[]): number => {
    return history
    .filter((item) => item.goal_group_id === savingsId)
    .reduce((total, item) => total + item.amount_saved, 0);
};

const noImagePng:string ='https://borderlesss.sakura.ne.jp/ss1/assets/images/avatar-boy-01.png';
// ListCheckBox コンポーネントの定義
export default function ListCheckBox({
    listData,
    historyData = [],
    childPage,
    // type,
    className = '',
    ...props
}: {
    listData: SavingTypes[];
    historyData?: HistoryTypes[];
    childPage?: boolean;
    className?: string;
    // type: number
}) {

    return (
        <ul
        className={`flex flex-wrap items-stretch justify-start gap-1 ${className}`}
            {...props}>
            {listData
                .filter((item) => item.goal_level === 1) // goal_levelが1のアイテムのみ処理
                .map((item) => {
                    const monthsUntilDeadline = calculateMonthsDifference(item.goal_date);
                    const totalSavings = calculateTotalSavings(item.goal_group_id, historyData);

                    // 同じ saving_id を持ち、goal_level が 1 ではないタイトルを取得
                    const matchingTitles = listData
                        .filter(
                            (innerItem) =>
                                innerItem.goal_group_id === item.goal_group_id &&
                                innerItem.goal_level !== 1
                        )
                        .map((innerItem) => (
                            <TitleSavings
                                key={innerItem.goal_group_id}
                                title={innerItem.goal_name}
                                type={innerItem.goal_level}
                                className="text-white mb-0.5"
                            />
                        ));

                    return (
                        <li
                            key={item.goal_group_id}
                            className={`overflow-hidden min-h-52 h-auto w-full ${childPage
                                    ? ''
                                    : 'sm:w-[calc(50%-2px)] md:w-[calc(33%-2px)] lg:w-[calc(25%-2px)]'
                                } bg-black/70 rounded-xl`}                        >
                            <a
                                href={`/home/${item.goal_group_id}`}
                                className="relative flex flex-col justify-between w-full h-full px-2 py-1"
                            >
                                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
                                    <TitleSavings
                                        title={item.goal_name}
                                        type={item.goal_level}
                                        className="text-white"
                                    />
                                    {/* goal_group_id が一致し、goal_level が 1 ではないタイトルを表示 */}
                                    <div className="mt-2">
                                        {matchingTitles}
                                    </div>
                                </div>
                                <p className="text-xs text-white">
                                {item.goal_date} （{monthsUntilDeadline}ヶ月後）
                                </p>
                                <div className="flex items-stretch justify-end">
                                    <p className="text-white font-bold">
                                        <ConvertPrice price={totalSavings} />
                                    </p>
                                    <p className="text-white before:content-['/'] before:inline-block before:mx-1">
                                        <ConvertPrice price={item.goal_amount} />
                                    </p>
                                </div>
                                <img
                                    src={item.goal_images ? `/images/${item.goal_images}` : noImagePng}
                                    // src={noImagePng}//あとで直す
                                    alt={`${item.goal_name}のイメージ`}
                                    className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full object-cover object-center z-[-1]"
                                />
                            </a>
                        </li>
                    );
                })}
        </ul>
    );
}
