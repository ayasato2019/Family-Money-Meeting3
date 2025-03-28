import ConvertPrice from "@/Components/ConvertPrice";

export default function TitleModal({
    className = '',
    category,
    num = 0, // デフォルト値を設定
    ...props
}: {
    className?: string;
    num: number;
    category: 'Savings' | 'Investment' | 'Expense' | 'Waste' | 'Donation';
}) {
    // カテゴリに対応する日本語のラベルを定義
    const categoryLabels: Record<typeof category, string> = {
        'Donation': 'きふ',
        'Waste': 'ほしい',
        'Expense': 'ひつよう',
        'Investment': 'とうし',
        'Savings': 'ちょきん もくひょう',
    };

    // カテゴリに応じたメッセージを取得する関数
    const getCategoryUnit = () => {
        switch (category) {
            case 'Donation':
                return `寄付が${num}件あります。`;
            case 'Waste':
                return `無駄遣いが${num}件あります。`;
            case 'Expense':
                return `必要経費が${num}件あります。`;
            case 'Investment':
                return (
                    <>
                    全投資額&nbsp;<ConvertPrice price={num} />
                    </>
                )
            case 'Savings':
                return <p>{num}&nbsp;件</p>;
            default:
                return '';
        }
    };

    return (
        <>
            <header className={'flex items-center justify-between border-b border-solid border-primary ' + className}>
                <h2 className='block text-left py-1 text-lg font-bold leading-5 focus:outline-none font-secondry'>
                    {categoryLabels[category]}
                </h2>
                <div className="text-right">
                    {getCategoryUnit()} {/* 動的なメッセージを表示 */}
                </div>
            </header>
        </>
    );
}
