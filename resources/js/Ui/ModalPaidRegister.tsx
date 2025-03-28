import { useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import InputText from '@/Components/InputText';
import ButtonPrimary from '@/Components/Button/PrimaryButton';
import InputPrice from '@/Components/Input/InputPrice';
import InputDate from '@/Components/Input/InputDate';
import { UserTypes } from '@/types/tableUserData';

// 型定義
interface PageProps {
    auth: {
        user: UserTypes;
    };
}

export default function ModalPaidRegister({
    goal_id,
    category,
    setIsOpen,
}: {
    goal_id: number;
    category: number;
    setIsOpen: (value: boolean) => void;
}) {

    const { auth } = usePage().props as unknown as PageProps;
    const user = auth.user;
    const today = new Date().toISOString().slice(0, 10);

    // 入力データの状態管理
    const [formData, setFormData] = useState({
        memo: "",
        amount: 0,
        goal_id: goal_id,
        category: category,
        date: today,
    });

    // 入力値の変更を管理
    const handleChange = (value: string | number, field: string) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

// フォームの送信処理
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMemo = `しようりれき：${formData.memo}`;

    // FormDataを使って送信データを整える
    const form = new FormData();
    form.append("memo", updatedMemo);
    form.append("amount", (formData.amount * -1).toString()); // マイナス化
    form.append("goal_id", formData.goal_id.toString());
    form.append("category", formData.category.toString());
    form.append("date", formData.date);
    form.append("user_id", user.id.toString());
    form.append("is_shared", "0");

    try {
        const response = await fetch("/saving/paid/", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken.current,
            },
            body: form,
        });
            if (response.ok) {
                setFormData({
                    memo: "",
                    amount: 0,
                    date: today,
                    goal_id,
                    category,
                });
                setIsOpen(false); 
            } else {
                const errorText = await response.text();
            }
        } catch (error) {
            // console.error("通信エラー:", error);
            alert("通信エラーが発生しました。");
        }
    };

    // CSRFトークン取得
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    return (
        <div className="px-4 py-6">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="user_id" value={user.id} />
                <input type="hidden" name="category" value={1} />
                <label className="flex flex-col gap-2">
                    <span className="font-bold text-gray-400">なにに使った？</span>
                    <InputText
                        type="text"
                        id="memo"
                        name="memo"
                        value={formData.memo}
                        onChange={(e) => handleChange(e.target.value, "memo")}
                        placeholder="タイトルを入力"
                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                    />
                </label>
                <label className="flex flex-col gap-2 pt-4">
                    <span className="font-bold text-gray-400">なにに使った？</span>
                    <InputDate
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                        onChange={(e) => handleChange(e.target.value, "date")}
                    />
                </label>
                <label className="flex flex-col gap-2 pt-4">
                    <span className="font-bold text-gray-400">いくら使った？</span>
                    <InputPrice
                        type="text"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) => handleChange(Number(e.target.value), "amount")}
                        placeholder="（例）2000円"
                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                    />
                </label>
                <div className="flex justify-center w-auto mx-auto mt-4">
                    <ButtonPrimary type="submit">登録</ButtonPrimary>
                </div>
            </form>
        </div>
    );
}
