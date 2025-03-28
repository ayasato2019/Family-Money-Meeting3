import { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MenberAddContents from '@/Pages/Teams/TeamEdit'

export default function TeamsRegister({user_id, role, team_name}:{
    user_id: number;
    role: number;
    team_name: string;
}) {

    // useFormフックを使ってフォームデータを管理
    const { data, setData, post, processing, errors } = useForm({
        team_name: team_name ? team_name : '', // 初期値として空文字列
        user_id: user_id,
        role: role,
    });

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('./teams_confirm');
    };

    //ページタイトル
    const pagetitle = "チーム";


    return (
        <>
        <Head title={pagetitle} />
    <AuthenticatedLayout
        header={
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={24} height={24}><path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/></svg>{pagetitle}
            </h1>
        }
    >
        <MenberAddContents />
        {role === 10 ? (
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="hidden"
                    name="user_id"
                    value={user_id}
                    className="mt-1 block w-full"
                />
                <TextInput
                    type="hidden"
                    name="role"
                    value={role}
                    className="mt-1 block w-full"
                />
                <div>
                    <InputLabel htmlFor="team_name" value="チーム名" />

                    <TextInput
                        id="team_name" // idを修正
                        name="team_name" // name属性を修正
                        value={data.team_name} // useFormの状態を反映
                        className="mt-1 block w-full"
                        autoComplete="name"
                        placeholder='例）〇〇家・〇〇ファミリー'
                        isFocused={true}
                        onChange={(e) => setData('team_name', e.target.value)}
                        required
                    />
                </div>

                <div className="my-4 flex items-center justify-end">
                    <PrimaryButton
                        className="mx-auto"
                        disabled={processing}
                    >登録</PrimaryButton>
                </div>
            </form>
) : ('')}
        </AuthenticatedLayout>
</>
    );
}
