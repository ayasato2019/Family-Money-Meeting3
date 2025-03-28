// 月数を計算する関数（date_savedを使用）
export const calculateMonthsDifference = (date_saved: string): number => {
    const isValidDate = /^(\d{4})-(\d{2})-(\d{2})$/.test(date_saved);

    if (!isValidDate) {
        console.error(`不正な日付形式: ${date_saved}`);
        return NaN;  // 不正な形式ならNaNを返す
    }

    const savedDate = new Date(date_saved);
    const today = new Date();
    const yearDiff = savedDate.getFullYear() - today.getFullYear();
    const monthDiff = savedDate.getMonth() - today.getMonth();
    // console.log('SaveDate' + savedDate);
    // console.log('today' + today);
    // console.log('yearDiff' + yearDiff);
    // console.log('month' +  monthDiff);
    return yearDiff * 12 + monthDiff;
};
