import { useState } from 'react';
import { SavingTypes } from '@/types/tableSavingData';
import { HistoryTypes } from '@/types/tableHistoryData';
import TitleSection from '@/Components/TitleSection';
import ListSavings from '@/Components/ListSaving';
import ButtonPrimary from '@/Components/ButtonPrimary';
import Modal from '@/Components/Modal';
// import ModalSavingRegister from '@/Ui/ModalSavingRegister';

export default function TopSaving({
    listData,
    num,
    historyData = [],
}: {
    listData: SavingTypes[];
    num: number;
    childPage: boolean,
    historyData?: HistoryTypes[];
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <section className='py-5 md:py-10 px-2'>
            <TitleSection category='Savings' num={num} />
            <ListSavings
                listData={listData}
                historyData={historyData}
                childPage={false}
                className="mt-2"
            />
        </section>
    );
}
