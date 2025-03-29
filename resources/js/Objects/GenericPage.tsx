"use client"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FarstView from '@/Objects/FarstView';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import EditHouseholdModal from '@/Objects/ModalEditer';
import CommentModal from '@/Objects/ModalComments';
import InputText from '@/Components/Input/InputText';
import InputDate from '@/Components/Input/InputDate';
import InputPrice from '@/Components/Input/InputPrice';
import LiatDataList from '@/Objects/GenericList';
import { CommentsTypes } from '@/types/tableCommentsData';
import { UserTypes } from '@/types/tableUserData';
import { router } from '@inertiajs/react';

interface GenericPageProps {
listdata: any[];
pagetitle: string;
targetType: 0 | 1 | 2 | 3 | 4 | 5 | 6;
postUrl: string;
deleteUrlPrefix: string;
achieveUrlPrefix: string;
categoryId: number;
}

export default function GenericListPage({
listdata,
pagetitle,
targetType,
postUrl,
deleteUrlPrefix,
achieveUrlPrefix,
categoryId,
}: GenericPageProps) {
const { auth, team_id, comments } = usePage<{ auth: { user: UserTypes }, team_id: number, comments: CommentsTypes[] }>().props;
const user = auth.user;

const { data, setData, post, reset, processing } = useForm({
    title: '',
    price: 0,
    date: '',
    achieve: 1,
    is_shared: 0,
    images: '',
    memo: '',
    comment: '',
    comment_id: 0,
});

const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    post(postUrl, { onSuccess: () => reset() });
};

const handleDelete = (id: number) => {
    post(`${deleteUrlPrefix}/${id}`, { method: 'delete' });
};

const handleToggleAchieve = (id: number, newValue: boolean) => {
    router.patch(`${achieveUrlPrefix}/${id}`, { achieve: newValue ? 1 : 0 }, { preserveScroll: true });
};

const [isModalOpen, setIsModalOpen] = useState(false);
const [editingItem, setEditingItem] = useState<any | null>(null);
const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
};
const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
};

const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
const [selectedComment, setSelectedComment] = useState<CommentsTypes | null>(null);

const handleComment = (item: any) => {
    const comment = comments.find(c => c.target_id === item.id && c.target_type === targetType);
    const newComment: CommentsTypes = comment ?? {
    id: item.comment_id ?? 0,
    team_id: team_id ?? 0,
    user_id_to: item.user_id,
    target_type: categoryId as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    target_id: item.id,
    title: item.title,
    date: item.date,
    comment: '',
    };
    setSelectedComment(newComment);
    setIsCommentModalOpen(true);
};

const closehandleCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedComment(null);
};

const handleCommentSubmit = (comment: {
    id: number
    team_id: number
    comment: string
    target_id: number
    target_type: number
    user_id_to: number
    }) => {
    post("/comments", {
        ...comment,
        onSuccess: () => closehandleCommentModal(),
    })
}



return (
    <AuthenticatedLayout header={<h1 className="text-lg font-semibold text-center">{pagetitle}</h1>}>
    <Head title={pagetitle} />
    <FarstView category={categoryId as 0 | 1 | 2 | 3 | 4 | 5 | 6} />
    <form onSubmit={handleRegister} className="mb-6">
        <ul className="flex flex-col gap-2">
        <li><InputLabel value="日付" /><InputDate value={data.date} onChange={(e) => setData('date', e.target.value)} required /></li>
        <li><InputLabel value="買ったもの" /><InputText value={data.title} onChange={(e) => setData('title', e.target.value)} required /></li>
        <li><InputLabel value="金額" /><InputPrice value={data.price} onChange={(e) => setData('price', Number(e.target.value))} required /></li>
        <li><InputLabel value="メモ" /><TextInput value={data.memo} onChange={(e) => setData('memo', e.target.value)} /></li>
        <li className="flex items-center gap-2">
            <Checkbox checked={data.is_shared === 0} onChange={(e) => setData('is_shared', e.target.checked ? 0 : 1)} />
            <InputLabel htmlFor="is_shared" value="家族と共有する" />
        </li>
        </ul>
        <PrimaryButton type="submit" disabled={processing} className="mt-4 mx-auto block">追加</PrimaryButton>
    </form>

    <LiatDataList
        data={listdata}
        targetType={targetType}
        onToggleAchieve={handleToggleAchieve}
        userId={user.id}
        teamId={user.team_id ?? 0}
        onComment={handleComment}
        onEdit={handleEdit}
        onDelete={handleDelete}
        comments={comments}
    />

    <EditHouseholdModal isOpen={isModalOpen} onClose={closeModal} listData={editingItem} isDelete={handleDelete} />
    <CommentModal
        isCommentOpen={isCommentModalOpen}
        onCommentClose={closehandleCommentModal}
        listData={selectedComment}
        onSubmit={handleCommentSubmit} />
    </AuthenticatedLayout>
);
}
