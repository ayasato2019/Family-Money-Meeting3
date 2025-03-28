// import { HistoryTypes } from '@/types/tableHistoryData';

// export default function calculateTotalSavings({
//     savingsId,
//     history,
//     goalLevel,
// }: {
//     savingsId: number,
//     history: HistoryTypes[],
//     goalLevel: number
// })
// if (goalLevel === 1) {
//     return history
//         .filter((item) => item.goal_group_id === savingsId)
//         .reduce((total, item) => total + (item.amount_saved || 0), 0);
// }

// return history
//     .filter((item) => item.goal_group_id === savingsId)
//     .reduce((total, item) => (total * 0) + (item.amount_saved || 0), 0);
//     }
// return;
// )


// import { useState } from 'react';
// import TitleSavings from '@/Components/TitleSavings';
// import ConvertPrice from '@/Components/ConvertPrice';
// import StatusBar from '@/Components/StatusBarLarge';
// import InputButtons from '@/Components/InputButtons';
// import FarstView from '@/Ui/FarstViewAvatar';
// import noImageAvatar from '../../images/photo-noImages.jpg';

// // ファイルのインポート
// import { inputSavingData } from '@/data/Saving';
// import { inputHistoryData } from '@/data/HistoryData';
// import { openToggle } from '@/Functions/openToggle';

// type SavingTypes = {
//     saving_id: number;
//     user_id: number;
//     comment_id: number;
//     goal_group_id: number;
//     goal_name: string;
//     goal_amount: number;
//     goal_date: string;
//     goal_level: number;
//     goal_images: string;
//     is_shared: boolean;
//     memo: string;
// };

// type HistoryTypes = {
//     history_id: number;
//     user_id: number;
//     comments_id: number;
//     category: number;
//     goal_group_id: number;
//     amount_saved: number;
//     memo_images: string;
//     date_saved: string;
//     memo: string;
//     at_create: string;
// };

// export default function SavingId() {
//     const savingDatas: SavingTypes[] = inputSavingData;
//     const historyData: HistoryTypes[] = inputHistoryData;

//     // データ抽出
//     const goal_group_id = 3;
//     const savingData = savingDatas
//         .filter((item) => item.goal_group_id === goal_group_id)
//         .sort((a, b) => a.goal_level - b.goal_level)[0];

//     // goal_levelが2または3のgoal_group_idを持つデータを抽出
//     const savingDatasLevel2And3 = savingDatas
//         .filter((item) => item.goal_group_id === goal_group_id && (item.goal_level === 2 || item.goal_level === 3));

//     // 積立額の計算
//     const calculateTotalSavings = (savingsId: number, history: HistoryTypes[], goalLevel: number): number => {
//         if (goalLevel === 1) {
//             return history
//                 .filter((item) => item.goal_group_id === savingsId)
//                 .reduce((total, item) => total + (item.amount_saved || 0), 0);
//         }

//         return history
//             .filter((item) => item.goal_group_id === savingsId)
//             .reduce((total, item) => (total * 0) + (item.amount_saved || 0), 0);
//     };

//     // 必要なstateとuseEffectの配置
//     const [currentPrice, setCurrentPrice] = useState<number>(0);
//     const [savedPrice, setSavedPrice] = useState<number>(0);

//     // 入力値の変更をハンドル
//     const handlePriceChange = (newPrice: number) => {
//         setCurrentPrice(newPrice); // 入力値を更新
//     };
//     // 状態管理
//     const [statusBarAmount, setStatusBarAmount] = useState<number>(
//         calculateTotalSavings(savingData.goal_group_id, historyData, savingData.goal_level)
//     );

//     const handleSave = (newAmount: number) => {
//         const updatedAmount =
//             newAmount + calculateTotalSavings(savingData.goal_group_id, historyData, savingData.goal_level);
//         setSavedPrice(updatedAmount);
//         setStatusBarAmount(updatedAmount);
//     };

//     const getLevelLabel = (goalLevel: number): string => {
//         switch (goalLevel) {
//             case 1:
//                 return "L1";
//             case 2:
//                 return "L2";
//             case 3:
//                 return "L3";
//             default:
//                 return "Unknown";
//         }
//     };

//     const savingsTotal = historyData
//         .filter((item) => item.category === 1)
//         .reduce((total, item) => total + (item.amount_saved || 0), 0);

//     const investmentTotal = historyData
//         .filter((item) => item.category === 2)
//         .reduce((total, item) => total + (item.amount_saved || 0), 0);

//     const essentialTotal = historyData
//         .filter((item) => item.category === 3)
//         .reduce((total, item) => total + (item.amount_saved || 0), 0);

//     const extravaganceTotal = historyData
//         .filter((item) => item.category === 4)
//         .reduce((total, item) => total + (item.amount_saved || 0), 0);

//     const donationTotal = historyData
//         .filter((item) => item.category === 5)
//         .reduce((total, item) => total + (item.amount_saved || 0), 0);

//     let donationLevel: number = donationTotal;
//     if (donationTotal < 1000) {
//         donationLevel = 1;
//     } else if (donationTotal < 2000) {
//         donationLevel = 2;
//     } else if (donationTotal < 3000) {
//         donationLevel = 3;
//     } else if (donationTotal < 4000) {
//         donationLevel = 4;
//     } else if (donationTotal < 5000) {
//         donationLevel = 5;
//     }

//     const userDataAfter = {
//         // id: user.id,
//         // user_id: user.user_id,
//         // name: user.name,
//         // birth_date: user.birth_date, // ISO 8601形式の日付文字列
//         // is_admin: user.is_admin,
//         // email: user.email, // メールアドレスは親ユーザーのみ
//         // phone_number: user.phone_number, // 電話番号は親ユーザーのみ
//         // savings: savingsTotal, //貯金の合計金額
//         // investment: investmentTotal, //投資の合計金額
//         // essential: essentialTotal, //必要
//         // extravagance: extravaganceTotal, //欲しい結果
//         // planned_extravagance: extravaganceTotal.planned_extravagance, //欲しい予定
//         // level: donation.lavel, //寄付のレベルと紐付け
//         // donation: donation.amount, //寄付の合計金額
//         id: 1,
//         user_id: 1,
//         name: "子ども",
//         birth_date: "20000101",
//         is_admin: true,
//         email: "test@test.com",
//         phone_number: "00000000000",
//         savings: savingsTotal | 0, //貯金の合計金額
//         investment: investmentTotal | 0, //投資の合計金額
//         essential: essentialTotal | 0, //必要の合計金額
//         extravagance: extravaganceTotal | 0, //欲しいの合計金額
//         planned_extravagance: extravaganceTotal, //欲しい予定
//         level: donationLevel, //寄付のレベルと紐付け
//         donation: donationTotal | 0, //寄付の合計金額
//     };

//     // タイトルクリックで開閉を管理するための状態
//     const { openIndexes, handleToggle } = openToggle();

//     return (
//         <div className='overflow-hidden flex items-center justify-center w-full h-full'>
//             <div className='overflow-auto flex flex-col gap-5 w-full max-w-[64vmin] h-[100vmin] border-solid border-8 border-black rounded-2xl bg-white'>
//                 <FarstView
//                     UserData={userDataAfter}
//                     category={1}
//                     fvImages={noImageAvatar}
//                 />

//                 <div className='flex flex-col gap-5'>
//                     <ul className='px-4'>
//                         <li>
//                             <div>
//                                 <p className='text-sm font-semibold'>{savingData.goal_date}</p>
//                                 {savingData.goal_level === 1 ? (
//                                     <TitleSavings
//                                         type={1}
//                                         title={savingData.goal_name}
//                                     />
//                                 ) : ''}
//                                 <div className='relative w-full h-auto mt-2'>
//                                     <StatusBar
//                                         size="large"
//                                         total={savingData.goal_amount}
//                                         amount={statusBarAmount}
//                                     />
//                                     <p
//                                         className='absolute top-1/2 right-2 translate-y-[-50%] z-10 flex items-center justify-center text-primary font-bold mix-blend-difference'>
//                                         <ConvertPrice
//                                             price={statusBarAmount} // ここのpriceはGoal_level1~3までの総額
//                                         />/<ConvertPrice
//                                             price={savingData.goal_amount}
//                                         />
//                                     </p>
//                                 </div>

//                                 {/* コメントの表示 */}
//                                 {/* {getComments(savingData.comment_id, commentsChecked).map((comment, index) => (
//                             <CommmentLeft
//                                 key={index}
//                                 className='mt-2'
//                                 commentsText={comment.comment_text} // コメントテキストを表示
//                             />
//                         ))} */}
//                                 <InputButtons
//                                     className='mt-5'
//                                     onChange={handlePriceChange} // 入力値変更時に実行
//                                     onSave={handleSave}
//                                 />
//                             </div>

//                             {/* goal_levelが2または3の関連データを表示 */}
//                             <div className='flex flex-col gap-5 mt-5'>
//                                 {savingDatasLevel2And3.length > 0 ? (
//                                     savingDatasLevel2And3.map((item, index) => {
//                                         const isOpen = openIndexes.has(index);
//                                         return (
//                                             <div key={index} className="relative w-full h-auto min-h-6 mt-2">
//                                                 <div
//                                                     className='flex justify-start items-center gap-2'
//                                                     onClick={() => handleToggle(index)}
//                                                     onTouchStart={() => handleToggle(index)}
//                                                 >
//                                                     <TitleSavings
//                                                         type={item.goal_level}
//                                                         title={item.goal_name}
//                                                         className='!justify-start items-start'
//                                                     />
//                                                     <span className="">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" fill="none" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
//                                                             <path fill="#666" d="M4.655 3.933a1 1 0 0 1-1.31 0L.831 1.756C.131 1.15.561 0 1.486 0h5.028c.926 0 1.354 1.15.655 1.756z" />
//                                                         </svg>
//                                                     </span>
//                                                 </div>

//                                                 {/* タイトル以外を開閉する */}
//                                                 {isOpen && (
//                                                     <div className="transition-all duration-300">
//                                                         <p className='ml-7 mt-1'>{item.memo}</p>
//                                                         <p className='text-right text-sm font-bold'>
//                                                             <ConvertPrice
//                                                                 price={statusBarAmountL2L3}
//                                                             /> / <ConvertPrice price={item.goal_amount} />
//                                                         </p>
//                                                         <StatusBar
//                                                             size="small"
//                                                             total={item.goal_amount}
//                                                             amount={statusBarAmountL2L3} // 新しく計算した積立金額
//                                                         />
//                                                         <InputButtons
//                                                             className='mt-5'
//                                                             onChange={handlePriceChange} // 入力値変更時に実行
//                                                             onSave={handleSave}
//                                                         />
//                                                     </div>
//                                                 )}
//                                                 {/* コメントの表示 */}
//                                                 {/* {getComments(item.comment_id, commentsChecked).map((comment, index) => (
//                                             <CommmentLeft
//                                                 key={index}  // key を指定することで効率的なレンダリングを促進
//                                                 className='mt-2'
//                                                 commentsText={comment.comment_text} // comment_text を渡す
//                                             />
//                                         ))} */}
//                                             </div>
//                                         );
//                                     })
//                                 ) : (
//                                     <p>関連するデータが見つかりませんでした。</p>
//                                 )}
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

