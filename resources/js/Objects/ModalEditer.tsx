import { useState } from 'react';
import Modal from '@/Components/Modal';
import { HouseholdTypes } from "../types/Household";
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface EditHouseholdModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (data: HouseholdTypes) => void;
    listData: HouseholdTypes;
}

interface CustomPageProps extends PageProps {
    team_name?: string | null;
}

export default function Household({
    isOpen,
    onClose,
    onUpdate,
    listData
}: EditHouseholdModalProps) {

    // 編集
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const { team_name } = usePage<CustomPageProps>().props;
    const { data, setData, post, reset, processing } = useForm({
        id: editingId,
        team_id: team_name,
        title: listData?.title || '',
        price: listData?.price || 0,
        date: listData?.date || '',
        is_share: listData?.is_share ? 1 : 0,
        images: listData?.images || '',
        memo: listData?.memo || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/household_edit/${editingId}`, {
            onSuccess: () => {
                onUpdate: (data: Partial<HouseholdTypes>) => void;
                closeModal();
            },
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    return (
        <>
            {/* 編集モーダル */}
            {isModalOpen && (
                <Modal show={isOpen} onClose={closeModal}>
                    <div className="mt-4 flex gap-4 items-center">
                        <div className="flex gap-4">
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)} />
                            <input
                                type='text'
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)} />
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', Number(e.target.value))} />
                        </div>
                    </div>
                    <button
                        className="mt-4 border-red-500 border-solid border-2 text-red-500 px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        閉じる
                    </button>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleUpdate}
                    >
                        アップデート
                    </button>
                </Modal>
            )}
        </>
    );
}
