export type ListCheckBoxTypes = {
    ID: number;
    type:  1 | 2 | 3; //１:収入用ピンク丸 2:支出用青四角 3：共有用緑四角
    title: string;
    deadline: string;
    price: number;
    memo: string;
}
