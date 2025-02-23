import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

interface EditListdModalProps {
    isOpen: boolean;
    onClose: () => void;
    listData: {
        id: number;
        title: string;
        price: number;
        date: string;
        is_share: boolean;
        images?: string | null;
        memo?: string | null;
    } | null;
}

export default function EditListdModal({
    isOpen,
    onClose,
    listData,
}: EditListdModalProps) {
    const { data, setData, post, processing } = useForm({
        title: listData?.title || "",
        price: listData?.price || 0,
        date: listData?.date || "",
        is_share: listData?.is_share ? 1 : 0,
        images: listData?.images || "",
        memo: listData?.memo || "",
    });

    useEffect(() => {
        if (listData) {
            setData({
                title: listData.title || "",
                price: listData.price || 0,
                date: listData.date || "",
                is_share: listData.is_share ? 1 : 0,
                images: listData.images || "",
                memo: listData.memo || "",
            });
        }
    }, [listData, setData]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!listData?.id) return;

        post(`/household_edit/${listData.id}`, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={handleUpdate}>
                <div className="relative mt-4 flex gap-4 items-center">
                    <div className="flex gap-4">
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                        />
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="mt-4 flex gap-4 justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        type="submit"
                        disabled={processing}
                    >
                        アップデート
                    </button>
                </div>
                <button
                    type="button"
                    className="absolute top-0 right-0 p-1"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24} height={24} >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="#666" />
                    </svg>
                </button>
            </form>
        </Modal>
    );
}
