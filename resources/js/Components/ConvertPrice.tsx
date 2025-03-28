function UnitYen() {
    return <span className="unit-yen">円</span>;
}

export default function ConvertPrice({ price }: { price: number }): JSX.Element {
    if (price === undefined) {
        return <span>価格がありません</span>;
    }
    const integerPrice = Math.floor(price); // 小数点以下を切り捨て
    return (
        <span>
            {integerPrice.toLocaleString('ja-JP')}
            <UnitYen />
        </span>
    );
}
