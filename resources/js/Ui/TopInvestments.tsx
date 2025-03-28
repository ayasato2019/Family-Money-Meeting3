// import { useState } from 'react';
// import { ListCheckBoxTypes } from '@/types/listCheckBox';
// import { InvestmentsTypes } from '@/types/tableInvestmentsData';
// import { HistoryTypes } from '@/types/tableHistoryData';
// import TitleSection from '@/Components/TitleSection';
// import ListCheckBox from '@/Components/ListCheckBox';
// import ButtonPrimary from '@/Components/ButtonPrimary';

// export default function TopInvestments({
//     listData,
//     history,
//     num,
// }: {
//     listData: InvestmentsTypes[];
//     history: HistoryTypes[];
//     num: number,
// }) {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const handleOpenModal = () => setIsModalOpen(true);
//     const handleCloseModal = () => setIsModalOpen(false);

//     const listCheckBoxItems: ListCheckBoxTypes[] = listData.map((investment) => ({
//         ID: investment.id,                          // IDをマッピング
//         type: 3,                                    // typeは固定値 3（共有用緑四角）
//         title: investment.title,                    // titleをマッピング
//         deadline: investment.investment_date,       // investment_dateをdeadlineにマッピング
//         price: investment.invested_amount,          // invested_amountをpriceにマッピング
//         memo: investment.unit_price.toString(),     // unit_priceをmemoにマッピング
//     }));

//     console.log(listCheckBoxItems);

//     return (
//         <section className='flex flex-col gap-5 py-5 md:py-10 px-2'>
//             <TitleSection category='Investment' num={num} className='mb-0' />
//             <ListCheckBox ListItems={listCheckBoxItems} />
//             <ButtonPrimary
//                 onClick={handleOpenModal}
//                 className='icon-plus mx-auto mt-5 gap-2'>
//                 気になる&nbsp;めいがら
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={12} height={12}>
//                     <path fill='#FFF' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
//                 </svg>
//             </ButtonPrimary>
//         </section>
//     );
// }
