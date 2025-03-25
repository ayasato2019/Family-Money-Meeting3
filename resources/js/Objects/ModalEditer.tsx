import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal/Modal";
import InputText from "@/Components/Input/InputText"
import InputDate from "@/Components/Input/InputDate"
import InputPrice from "@/Components/Input/InputPrice"

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
    isDelete?: (id: number) => void;
}

export default function EditListdModal({
    isOpen,
    onClose,
    listData,
    isDelete,
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
        <Modal show={isOpen} onClose={onClose} maxWidth="md">
            <form onSubmit={handleUpdate}>
                <div className="relative mt-4 flex gap-4 items-center justify-center p-4 w-full">
                    <div className="flex flex-col gap-4 w-full">
                        <InputDate
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                        />
                        <InputText
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputPrice
                            type="number"
                            value={data.price}
                            className="ml-auto w-full"
                            onChange={(e) => setData("price", Number(e.target.value))}
                        />
                        {/* <input
                            type="file"
                            onChange={(e) => {setData("images", e.target.value)}}
                        /> */}
                        <InputText
                            type="text"
                            value={data.memo}
                            className="w-full"
                            onChange={(e) => {setData("memo", e.target.value)}}
                        />
                    </div>
                </div>
                <div className="mt-4 mx-auto w-full flex gap-4 justify-center items-start">
                {isDelete && listData && (
                    <button
                    onClick={() => {
                        isDelete(listData.id);
                        onClose();
                    }}
                        className="border border-red-500 text-red-500 font-bold mb-5 px-4 py-2 rounded"
                    >
                        削除
                    </button>
                )}
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mb-5"
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
