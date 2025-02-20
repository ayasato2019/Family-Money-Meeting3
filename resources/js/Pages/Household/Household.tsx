import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import Comment from '@/Objects/Comment';
import ModalEditer from '@/Objects/ModalEditer';

interface HouseholdTypes {
    id: number;
    team_id: number;
    title: string;
    price: number;
    date: string;
    is_share: boolean;
    images?: string | null;
    memo?: string | null;
    comment_id?: number | null;
    created_at: string;
    updated_at: string;
}

export default function Household({
    household,
    role,
}: {
    household: HouseholdTypes[];
    role: number;
}) {

    const { data, setData, post, reset, processing } = useForm<{
        title: string;
        price: number;
        date: string;
        is_share: number;
        images: string;
        memo: string;
        comment_id: number | null;
        comment: string;
    }>({
        title: '',
        price: 0,
        date: '',
        is_share: 1,
        images: '',
        memo: '',
        comment_id: null,
        comment: '',
    });

    // 追加
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        post('/household_registration', {
            onSuccess: () => reset(), // 登録成功後にリセット
        });
    };


    // 削除
    const handleDelete = (id: number) => {
        post(`/household_del/${id}`, {
            method: 'delete',
        });
    };

    // 編集
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedHousehold, setSelectedHousehold] = useState<HouseholdTypes | null>(null);

    const handleUpdate = (updatedData: HouseholdTypes) => {
        setSelectedHousehold(updatedData);
        setIsModalOpen(false);
    };

    const handleEdit = (id: number) => {
        const item = household.find(h => h.id === id);
        if (item) {
            setSelectedHousehold(item);
            setEditingId(id);
            setIsModalOpen(true);
        }
    };

    // const [editingId, setEditingId] = useState<number | null>(null);

    // const handleEdit = (id: number) => {
    //     const item = household.find(h => h.id === id);
    //     if (item) {
    //         setData({
    //             ...data,
    //             title: item.title,
    //             price: item.price,
    //             date: item.date,
    //             is_share: item.is_share ? 1 : 0,
    //             images: item.images || '',
    //             memo: item.memo || '',
    //             // comment_id: item.comment_id || null, // 追加
    //             // comment: '', // 追加
    //         });
    //         setEditingId(id);
    //         setIsModalOpen(true);
    //     }
    // };

    // const handleUpdate = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     post(`/household_edit/${editingId}`, {
    //         onSuccess: () => {
    //             closeModal(); // 更新成功後にモーダルを閉じる
    //         },
    //     });
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    //コメント
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comenntId, setCommentId] = useState<number | null>(null);

    const handleCommentOpen = (id: number) => {
        const item = household.find(h => h.id === id);
        if (item) {
            setData({
                ...data,
                comment_id: item.comment_id || null,
                comment: '', // 初期化して空白にする
            });
            setCommentId(item.comment_id ?? null);
            setIsCommentModalOpen(true); // コメントモーダルを表示
        }
    };

    const handleCommentRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // コメントが更新された場合に送信
        alert('OK');

        post(`/comment`, {
            data: {
                comment_id: comenntId, // コメントID
                comment: data.comment, // コメントの内容
            },
            onSuccess: () => {
                closeCommentModal();
            },
        });
    };

    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
    };

    return (
        <>
            <h1>家計簿</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={data.price ?? 0}
                    onChange={(e) => setData('price', Number(e.target.value))}
                    required
                />
                <div className='flex'>
                    <InputLabel htmlFor="images" value="レシート登録" />
                    <TextInput
                        name="images"
                        type='file'
                        value={data.images}
                        onChange={(e) => setData('images', e.target.value)}
                    />
                </div>
                <div className='flex'>
                    <InputLabel htmlFor="is_share" value="メモ" />
                    <TextInput
                        name="memo"
                        value={data.memo}
                        onChange={(e) => setData('memo', e.target.value)}
                    />
                </div>
                {role === 10 ? (
                    <div className='flex'>
                        <Checkbox
                            name="is_share"
                            checked={data.is_share === 0}
                            onChange={(e) => setData('is_share', e.target.checked ? 0 : 1)}
                        />
                        <InputLabel htmlFor="is_share" value="秘密にする" />
                    </div>
                ) : ('')}
                <PrimaryButton
                    type="submit"
                    disabled={processing}
                >追加</PrimaryButton>
            </form>

            {household.filter(item => item.is_share || role === 10).length > 0 ? (
                <ul className='mb-5'>
                    {household
                        .filter(item => item.is_share || role === 10)
                        .map((item) => (
                            <li
                                key={item.id}
                                className="mt-4 flex flex-col gap-4 items-center">
                                <div className=" flex gap-4 items-center">
                                    <button
                                        className="w-6 h-6"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            width={24}
                                            height={24}
                                        >
                                            <path fill="#d71d1d" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                    </button>
                                    <div className="flex gap-4">
                                        <time>{item.date}</time>
                                        <p>{item.title}</p>
                                        <p>{item.price}円</p>
                                        <p>メモ：{item.memo}</p>
                                        <p>共有：{item.is_share ? 'オン' : 'オフ'}</p>
                                    </div>

                                    <button
                                        className="w-6 h-6"
                                        onClick={() => handleCommentOpen(item.id)}
                                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg></button>

                                    <button
                                        className="w-6 h-6"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                        </svg>
                                    </button>
                                </div>
                                <Comment
                                />
                            </li>
                        ))}
                </ul>
            ) : (
                <p>データはありません</p>
            )
            }


            {/* コメントモーダル */}
            {isModalOpen && (
                <Modal
                    show={isCommentModalOpen}
                    onClose={closeCommentModal}>
                    <div className="mt-4 flex gap-4 items-center">
                        <div
                            key={data.comment_id}
                            className="flex gap-4">
                            <input
                                type='text'
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="mt-4 border-red-500 border-solid border-2 text-red-500 px-4 py-2 rounded"
                        onClick={closeCommentModal}
                    >閉じる</button>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleCommentRegister}
                    >
                        アップデート
                    </button>
                </Modal>
            )}

            <ModalEditer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUpdate}
                listData={selectedHousehold}
            />

            {/* 編集モーダル */}
            {/* {isModalOpen && (
                <Modal show={isModalOpen} onClose={closeModal}>
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
            )} */}
        </>
    );
}
