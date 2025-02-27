import { useState } from 'react';
import Modal from '@/Components/Modal';
import Densgerbutton from '@/Components/ButtonDanger';
import PrimaryButton from '@/Components/ButtonPrimary';
import TitleModal from '@/Components/TitleModal';

export default function HamburgerMenuDropdown({
    menuItems,
    index,
    onDelete, // 親から渡された削除関数
}: {
    menuItems: { label: string }[];
    index: number;
    onDelete: (index: number) => void; // 削除関数の型
}) {
    const [showModal, setShowModal] = useState(false);
    const [newLabel, setNewLabel] = useState<string>(''); // 編集するラベル
    const [localMenuItems, setLocalMenuItems] = useState(menuItems); // ローカルでメニューアイテムを管理

    // モーダルを開く
    const openModal = () => {
        setShowModal(true);
    };

    // 削除処理
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // デフォルトの動作を防止（必要に応じて）
        onDelete(index); // 親コンポーネントの削除関数を呼び出す
        setShowModal(false); // モーダルを閉じる
    };

    // 編集処理
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // デフォルトの動作を防止（必要に応じて）
        if (newLabel) {
            const updatedItems = [...localMenuItems];
            updatedItems[index].label = newLabel; // 編集したラベルを反映
            setLocalMenuItems(updatedItems); // ローカル状態を更新
            setShowModal(false);
        }
    };

    return (
        <div className="relative inline-block">
            {/* トリガーボタン */}
            <button
                onClick={openModal}
                className="flex flex-col items-center justify-center w-4 h-4 gap-0.5"
            >
                <span className="block w-1 h-1 rounded-full bg-darkgray"></span>
                <span className="block w-1 h-1 rounded-full bg-darkgray"></span>
                <span className="block w-1 h-1 rounded-full bg-darkgray"></span>
            </button>

            {/* モーダル */}
            <Modal
                show={showModal}
                button={false}
                closeable={true}
                onClose={() => setShowModal(false)}
            >
                <div>
                    <TitleModal title="このメニューを編集しますか" />
                    <p className=' mt-5 text-center'>{localMenuItems[index].label}</p>
                    <div className="flex justify-center gap-2 mt-10">
                        {/* 削除ボタン */}
                        <Densgerbutton
                            onClick={handleDelete} // 削除処理
                        >削除</Densgerbutton>

                        {/* 編集ボタン */}
                        <PrimaryButton
                            onClick={handleEdit} // 編集処理
                        >編集</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
