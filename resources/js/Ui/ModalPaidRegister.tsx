import { useState } from "react";
import InputText from '@/Components/InputText';
import ButtonPrimary from '@/Components/Button/PrimaryButton';
import InputPrice from '@/Components/Input/InputPrice';

export default function ModalPaidRegister({
    goal_id,
    category,
}: {
    goal_id: number;
    category: number;
}) {

    // 入力データの状態管理
    const [formData, setFormData] = useState({
        memo: "",
        amount: 0,
        goal_id: goal_id,
        category: category,
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
        e.preventDefault();  // デフォルトのフォーム送信を防ぐ
        try {
            const response = await fetch("/saving/paid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']")?.getAttribute("content") || "", // CSRFトークン
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({
                    memo: "",
                    amount: 0,
                    goal_id: goal_id,
                    category: category,
                });
            } else {
                const errorText = await response.text();
                alert("登録に失敗しました。: " + errorText);
            }
        } catch (error) {
            console.error("エラー:", error);
            alert("エラーが発生しました。");
        }
    };

    return (
        <div className="px-4 py-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                    <span className="font-bold text-gray-400">何に使った？</span>
                    <InputText
                        type="text"
                        value={formData.memo}
                        onChange={(e) => handleChange(e.target.value, "memo")}
                        placeholder="タイトルを入力"
                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="font-bold text-gray-400">いくら使った？</span>
                    <InputPrice
                        type="text"
                        value={formData.amount}
                        onChange={(e) => handleChange(Number(e.target.value), "amount")}
                        placeholder="（例）2000円"
                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                    />
                </label>
                <div className="mx-auto">
                    <ButtonPrimary type="submit">登録</ButtonPrimary>
                </div>
            </form>
        </div>
    );
}
