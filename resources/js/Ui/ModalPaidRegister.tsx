import { useState } from "react";
import InputText from '@/Components/InputText';
import ButtonPrimary from '@/Components/ButtonPrimary';

interface HistoryTypes {
  amount_title: string;
}

export default function ModalSavingRegister() {
  const [formData, setFormData] = useState<HistoryTypes>({
    amount_title: "",
  });

  const handleChange = (value: string) => {
    setFormData({ amount_title: value });
  };

  const handleSubmit = async () => {
    console.log("登録するタイトル:", formData.amount_title);
    try {
      const response = await fetch("/api/savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("タイトルが登録されました！");
      } else {
        alert("登録に失敗しました。");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました。");
    }
  };

  return (
    <div className="modal">
      <div className="flex flex-col gap-5">
        <h2>タイトルを登録しよう</h2>
        <label>
          <span>タイトル</span>
          <InputText
            type="text"
            value={formData.amount_title}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="タイトルを入力"
            className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
          />
        </label>
        <div className="mx-auto">
          <ButtonPrimary onClick={handleSubmit}>登録</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
