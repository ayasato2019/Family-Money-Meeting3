export default function ConvertPrice({
    price,
    className,
}: {
    price: number,
    className?: string;
}) {
    if (price === undefined) {
        return <span>価格がありません</span>;
    }
    const integerPrice = Math.floor(price);
    return (
        <span className="font-bold text-primary-700 text-lg after:content-['円'] after:text-sm after:pl-0.5">
            {integerPrice.toLocaleString('ja-JP')}
        </span>
    );
}
