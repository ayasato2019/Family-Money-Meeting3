// import axios from 'axios';
// import { useState } from "react";
// import { UserTypes } from '@/types/tableUserData'
// import { SavingTypes } from '@/types/tableSavingData';
// import TitleModal from '@/Components/TitleModal';
// import InputPrice from '@/Components/InputPrice';
// import ButtonPrimary from '@/Components/ButtonPrimary';
// import ButtonSecondary from '@/Components/ButtonSecondary';
// import ConvertPrice from "@/Components/ConvertPrice";

// // StepコンポーネントのProps型定義
// interface StepProps {
//     onNext: () => void;
//     onBack?: () => void;
//     onChange: (value: string | number) => void;
//     savingValue: number;
//     investmentValue: number;
//     essentialValue: number;
//     extravaganceValue: number;
//     donationValue: number;
// }

// // ステップコンポーネント
// const Step1 = ({ onNext, onChange, savingValue, investmentValue, essentialValue, extravaganceValue, donationValue }: StepProps) => (
//     <div className="flex flex-col gap-5">
//         <TitleModal title="いま もってる きんがくを とうろくしよう" />
//         <label className="flex items-center justify-between gap-1">
//             <span>ちょきん</span>
//             <InputPrice
//                 defaultValue={0}
//                 value={savingValue}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple  "
//             />
//             {/* 単位の縁をつけるとなお良し */}
//         </label>
//         <label className="flex items-center justify-between gap-1">
//             <span>とうし</span>
//             <InputPrice
//                 defaultValue={0}
//                 value={investmentValue}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple  "
//             />
//             {/* 単位の縁をつけるとなお良し */}
//         </label>
//         <label className="flex items-center justify-between gap-1">
//             <span>ひつよう</span>
//             <InputPrice
//                 defaultValue={0}
//                 value={essentialValue}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple  "
//             />
//             {/* 単位の縁をつけるとなお良し */}
//         </label>
//         <label className="flex items-center justify-between gap-1">
//             <span>ほしい</span>
//             <InputPrice
//                 defaultValue={0}
//                 value={extravaganceValue}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple  "
//             />
//             {/* 単位の縁をつけるとなお良し */}
//         </label>
//         <label className="flex items-center justify-between gap-1">
//             <span>きふ</span>
//             <InputPrice
//                 defaultValue={0}
//                 value={donationValue}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple  "
//             />
//             {/* 単位の縁をつけるとなお良し */}
//         </label>
//         <div className="mx-auto mt-5">
//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>
//         </div>
//     </div>
// );

// interface confirmation {
//     onNext: () => void;
//     onBack: () => void;
//     value: UserTypes;
// }

// const Step2 = ({ onNext, onBack, value, onChange }: confirmation & StepProps) => (
//     <div className="flex flex-col gap-5">
//         <TitleModal title="これでいいかな？" />
//         <p>ちょきん: <ConvertPrice price={value.savings} /></p>
//         <p>とうし: <ConvertPrice price={value.investment} /></p>
//         <p>ひつよう: <ConvertPrice price={value.essential} /></p>
//         <p>ほしい: <ConvertPrice price={value.extravagance} /></p>
//         <p>きふ: <ConvertPrice price={value.donation} /></p>

//         <div className="flex items-center justify-center gap-2">
//             <ButtonSecondary onClick={onBack}>戻る</ButtonSecondary>
//             <ButtonPrimary onClick={onNext}>次へ</ButtonPrimary>
//         </div>
//     </div>
// );

// export default function ModalSavingRegister({UserData}: {UserData: UserTypes}) {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState<UserTypes>({
//         id: UserData.id,
//         user_id: UserData.user_id,
//         name: UserData.name,
//         birth_date: UserData.birth_date,
//         is_admin: true,
//         email: null,
//         phone_number: null,
//         savings: 0,
//         investment: 0,
//         essential: 0,
//         extravagance: 0,
//         planned_extravagance: 0,
//         donation: 0,
//         level: 0,
//     });
//     const handleNext = () => {
//         if (currentStep === 2) {
//             // APIリクエストを送信してデータを更新
//             axios.put(`/api/users/${formData.id}`, formData)
//                 .then(response => {
//                     console.log(response.data);
//                     // 成功時の処理
//                 })
//                 .catch(error => {
//                     console.error(error);
//                     // エラー時の処理
//                 });
//         }
//         setCurrentStep((prev) => prev + 1);
//     };
//     // const handleNext = () => setCurrentStep((prev) => prev + 1);
//     const handleBack = () => setCurrentStep((prev) => prev - 1);

//     // 共有のhandleChange
//     const handleChange = (field: keyof SavingTypes, value: string | number) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     return (
//         <div className="modal">
//             {currentStep === 1 && (
//                 <Step1
//                     onNext={handleNext}
//                     onChange={(value) => handleChange("goal_name", value)}
//                     savingValue={formData.savings}
//                     investmentValue={formData.investment} essentialValue={formData.essential}
//                     extravaganceValue={formData.extravagance} donationValue={formData.donation}
//                 />
//             )}
//             {currentStep === 2 && (
//                 <Step2
//                     onNext={handleNext}
//                     onBack={handleBack}
//                     onChange={(value) => handleChange("goal_level", value)}
//                     savingValue={formData.savings}
//                     investmentValue={formData.investment} essentialValue={formData.essential}
//                     extravaganceValue={formData.extravagance} donationValue={formData.donation} value={{
//                         id: 0,
//                         user_id: 0,
//                         name: "",
//                         birth_date: "",
//                         is_admin: false,
//                         email: null,
//                         phone_number: null,
//                         savings: 0,
//                         investment: 0,
//                         essential: 0,
//                         extravagance: 0,
//                         planned_extravagance: 0,
//                         level: 0,
//                         donation: 0,
//                         avatar: undefined
//                     }}                />
//             )}
//         </div>
//     );
// };
