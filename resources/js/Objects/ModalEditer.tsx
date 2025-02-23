import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

interface EditHouseholdModalProps {
  isOpen: boolean;
  onClose: () => void;
  household: {
    id: number;
    title: string;
    price: number;
    date: string;
    is_share: boolean;
    images?: string | null;
    memo?: string | null;
  } | null;
}

export default function EditHouseholdModal({
  isOpen,
  onClose,
  household,
}: EditHouseholdModalProps) {
  const { data, setData, post, processing } = useForm({
    title: household?.title || "",
    price: household?.price || 0,
    date: household?.date || "",
    is_share: household?.is_share ? 1 : 0,
    images: household?.images || "",
    memo: household?.memo || "",
  });

  useEffect(() => {
    if (household) {
      setData({
        title: household.title || "",
        price: household.price || 0,
        date: household.date || "",
        is_share: household.is_share ? 1 : 0,
        images: household.images || "",
        memo: household.memo || "",
      });
    }
  }, [household, setData]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!household?.id) return;

    post(`/household_edit/${household.id}`, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <form onSubmit={handleUpdate}>
        <div className="mt-4 flex gap-4 items-center">
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
            className="border-red-500 border-solid border-2 text-red-500 px-4 py-2 rounded"
            onClick={onClose}
            type="button"
          >
            閉じる
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            type="submit"
            disabled={processing}
          >
            アップデート
          </button>
        </div>
      </form>
    </Modal>
  );
}
