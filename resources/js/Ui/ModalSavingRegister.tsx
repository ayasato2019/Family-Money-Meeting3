// import { useState } from "react";
// import { SavingTypes } from '@/types/tableSavingData';
// import TitleModal from '@/Components/TitleModal';

// import InputText from '@/Components/InputText';

// import InputDate from '@/Components/InputDate';

// import ButtonPrimary from '@/Components/ButtonPrimary';

// import ButtonSecondary from '@/Components/ButtonSecondary';

// import noImage from '../../images/photo-noimages.jpg';

// import InputPrice from '@/Components/InputPrice';

// import RadioButton from '@/Components/RadioButton';

// import Information from '@/Components/Information';

// import CheckboxCommon from '@/Components/CheckboxCommon';

// import InputUproad from '@/Components/InputUproad';

// // StepコンポーネントのProps型定義

// interface StepProps {

//     onNext: () => void;

//     onBack?: () => void;

//     onChange: (value: string | number) => void;  // valueの型をstringまたはnumberに変更

//     value: string | number;  // valueの型をstringまたはnumberに変更

// }

// // ステップコンポーネント

// const Step1 = ({ onNext, onChange, value }: StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="もくひょうを立てよう！" />

//         <label>

//             <span>もくひょう</span>

//             <InputText

//                 type="text"

//                 value={value}

//                 onChange={(e) => onChange(e.target.value)}

//                 placeholder="(れい) 宇宙飛行士になりたい"

//                 className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple  "

//             />

//         </label>

//         <div className="mx-auto">

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// //中期的なら長期のタイトルを取得

// //短期的なら中期・長期のタイトルを取得

// const Step2 = ({ onNext, onBack, onChange, value }: StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="きかんをきめよう！" />

//         <Information

//             iconColor="#FFF"

//             messages="じかんが かかる もくひょうと、すぐ できることを くみあわせよう" />

//         <label className="flex gap-2">

//             <RadioButton

//                 type="radio"

//                 name="goal_level"

//                 value="1"

//                 className="mt-1"

//                 checked={value === 1}

//                 onChange={() => onChange(1)} // valueはnumber型

//             />

//             <div className="flex flex-col items-start justify-start">

//                 <p className="flex items-center justify-center border-2 border-solid border-primary px-2 py-0 w-auto text-primary font-bold">長期的（ちょうき）なゴール</p>

//                 <p className="mt-2 text-white">ゴールのもくひょう<br />

//                     れい）やきゅうせんしゅに なりたい</p>

//             </div>

//         </label>

//         <label className="flex gap-2">

//             <RadioButton

//                 type="radio"

//                 name="goal_level"

//                 value="2"

//                 className="mt-1"

//                 checked={value === 2}

//                 onChange={() => onChange(2)} // valueはnumber型

//             />

//             <div className="flex flex-col items-start justify-start">

//                 <p className="flex items-center justify-center border-2 border-solid border-pink px-2 py-0 w-auto text-pink font-bold">中期的（ちゅうき）なゴール</p>

//                 <p className="mt-2 text-white">ゴールするためにひつようなこと<br />

//                     れい）やきゅうチームで スタメンに なる</p>

//             </div>

//         </label>

//         <label className="flex gap-2">

//             <RadioButton

//                 type="radio"

//                 name="goal_level"

//                 value="3"

//                 className="mt-1"

//                 checked={value === 3}

//                 onChange={() => onChange(3)} // valueはnumber型

//             />

//             <div className="flex flex-col items-start justify-start">

//                 <p className="flex items-center justify-center border-2 border-solid border-orange px-2 py-0 w-auto text-orange font-bold">短期的（たんきてき）なゴール</p>

//                 <p className="mt-2 text-white">さいしょにとっぱするもくひょう<br />

//                     れい）まいにち すぶりを する</p>

//             </div>

//         </label>

//         <div className="flex items-center justify-center gap-2">

//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// //　締切を決めよう

// const Step3 = ({ onNext, onBack, onChange, value }: StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="しめきりをきめよう！" />

//         <Information

//             iconColor="#FFF"

//             messages="「いつまでにやる！」って きめておくと、できる かくりつが あがるよ！" />

//         <InputDate

//              flex-col

//             value={value}

//             onChange={(e) => onChange(e.target.value)} // valueはstring型

//             className="text-black"

//         />

//         <div className="flex items-center justify-center gap-2">

//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// // イメージ設定

// const Step4 = ({ onNext, onBack, onChange, value }: StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="もくひょうの しゃしんを とうろくしよう" />

//         <Information

//             iconColor="#FFF"

//             messages="もくひょうの 人や ばしょの しゃしんを とうろくすると、イメージ しやすいよ。" />

//         <InputUproad

//             value={typeof value === "number" ? String(value) : value}  // valueがstring型の場合でも数値として扱えるようにする

//             onChange={(e) => onChange(e.target.value)}

//             className="w-auto mt-1 text-black placeholder:italic placeholder:text-darkgray "

//         />

//         <div className="flex items-center justify-center gap-2">

//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// const Step5 = ({ onNext, onBack, onChange, value }: StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="もくひょうきんがくをきめよう！" />

//         <Information

//             iconColor="#FFF"

//             messages="もくひょうの ために ちょきん するなら せってい しよう" />

//         <InputPrice

//             value={typeof value === 'number' ? value : 0}  // valueがstring型の場合でも数値として扱えるようにする

//             onChange={(e) => onChange(Number(e.target.value))}  // 文字列を数値に変換

//             className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray "

//         />

//         <div className="flex items-center justify-center gap-2">

//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// const Step6 = ({ onNext, onBack, onChange, value }: StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="ひとことメモをかこう！" />

//         <Information

//             iconColor="#FFF"

//             messages="さんこうにした サイトなどをメモしておこう" />

//         <InputText

//             value={value}

//             onChange={(e) => onChange(e.target.value)} // valueはstring型

//             placeholder="メモを入力"

//             className="text-black"

//         ></InputText>

//         <div className="flex items-center justify-center gap-2">

//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// interface confirmation {

//     onNext: () => void;

//     onBack: () => void;

//     value: Saving;

// }

// const Step7 = ({ onNext, onBack, value, onChange }: confirmation & StepProps) => (

//     <div className="flex flex-col gap-5">

//         <TitleModal title="これでいいかな？" />

//         <p>タイトル: {value.goal_name}</p>

//         <p>期間: {value.goal_level === 1 ? "長期的" : value.goal_level === 2 ? "中期的" : "短期的"}</p>

//         <p>締め切り: {value.goal_date}</p>

//         <p>目標金額: {value.goal_amount}</p>

//         <p>メモ: {value.memo}</p>

//         {value.goal_level === 1 && (

//             <div className="flex items-center gap-2">

//                 <CheckboxCommon

//                     id="is_shared"

//                     checked={value.is_shared}

//                     onChange={(e) => onChange("is_shared", e.target.checked)}

//                 />

//                 <label htmlFor="is_shared" className="text-white">

//                     もくひょうを かぞくと きょうゆうする？

//                 </label>

//             </div>

//         )}

//         <div className="flex items-center justify-center gap-2">

//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>

//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>

//         </div>

//     </div>

// );

// export default function ModalSavingRegister() {

//     const [currentStep, setCurrentStep] = useState(1);

//     const [formData, setFormData] = useState<Saving>({

//         savings_id: 1,//後で設定

//         user_id: 1,//後で設定

//         goal_name: "",    // 目標の名前

//         goal_level: 1,    // 目標のレベル（1: 長期的、2: 中期的、3: 短期的）

//         goal_date: "",    // 目標の締切日

//         goal_amount: 0,   // 目標金額の初期値

//         goal_images: noImage,

//         is_shared: true,

//         memo: "",

//     });

//     const handleNext = () => setCurrentStep((prev) => prev + 1);

//     const handleBack = () => setCurrentStep((prev) => prev - 1);

//     // 共有のhandleChange

//     const handleChange = (field: keyof Saving, value: string | number) => {

//         setFormData((prev) => ({ ...prev, [field]: value }));

//     };

//     // 共有設定のみのhandleChange

//     const handleSharedChange = <T extends keyof Saving>(field: T, value: Saving[T]) => {

//         setFormData((prev) => ({ ...prev, [field]: value }));

//     };

//     const handleSubmit = async () => {

//         console.log("登録データ:", formData);

//         // SQLやAPIを通じてデータを登録する

//         try {

//             const response = await fetch("/api/savings", {

//                 method: "POST",

//                 headers: {

//                     "Content-Type": "application/json",

//                 },

//                 body: JSON.stringify(formData),

//             });

//             if (response.ok) {

//                 alert("登録が完了しました！");

//                 // 必要ならモーダルを閉じたりリセット処理

//             } else {

//                 alert("登録に失敗しました。");

//             }

//         } catch (error) {

//             console.error("エラー:", error);

//             alert("エラーが発生しました。");

//         }

//     };

//     return (

//         <div className="modal">

//             {currentStep === 1 && (

//                 <Step1

//                     onNext={handleNext}

//                     onChange={(value) => handleChange("goal_name", value)}

//                     value={formData.goal_name}

//                 />

//             )}

//             {currentStep === 2 && (

//                 <Step2

//                     onNext={handleNext}

//                     onBack={handleBack}

//                     onChange={(value) => handleChange("goal_level", value)}

//                     value={formData.goal_level}

//                 />

//             )}

//             {currentStep === 3 && (

//                 <Step3

//                     onNext={handleNext}

//                     onBack={handleBack}

//                     onChange={(value) => handleChange("goal_date", value)}

//                     value={formData.goal_date}

//                 />

//             )}

//             {currentStep === 4 && (

//                 <Step4

//                     onNext={handleNext}

//                     onBack={handleBack}

//                     onChange={(value) => handleChange("goal_amount", value)}

//                     value={formData.goal_amount}

//                 />

//             )}

//             {currentStep === 5 && (

//                 <Step5

//                     onNext={handleNext}

//                     onBack={handleBack}

//                     onChange={(value) => handleChange("goal_amount", value)}

//                     value={formData.goal_amount}

//                 />

//             )}

//             {currentStep === 6 && (

//                 <Step6

//                     onNext={handleNext}

//                     onBack={handleBack}

//                     onChange={(value) => handleChange("memo", value)}

//                     value={formData.memo}

//                 />

//             )}

//             {currentStep === 7 && (

//                 <Step7

//                     onNext={handleSubmit}

//                     onBack={handleBack}

//                     value={formData}

//                 />

//             )}

//         </div>

//     );

// };
