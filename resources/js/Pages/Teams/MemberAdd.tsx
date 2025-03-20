import { useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormEventHandler } from 'react';
import { AuthPageProps } from '@/types/AuthPageProps';

// 🟢 TeamMember インターフェース
interface TeamMember {
    name: string;
    id: number;
    role: number;
}

export default function MemberAdd({
    loginChildUrl,
    qrCodeBase64,
}: {
    loginChildUrl: string;
    qrCodeBase64: string;
}) {
    const { auth, team_id, team_members } = usePage<AuthPageProps>().props;
    const user = auth?.user || null;
    const safeTeamId: number = team_id ?? 0;
    const teamMembers: TeamMember[] = (team_members ?? []) as TeamMember[];
    console.log("🚀 user の全データ:", user);

    // useFormフックを使ってフォームデータを管理
    const { data, setData, post, processing, errors, reset } = useForm<{
        childs_name: string;
        role_child: number;
        password: string;
        password_confirmation: string;
        birth_date: string;
        team_id: number;
    }>({
        childs_name: '',
        role_child: 1,
        password: 'password',
        password_confirmation: 'password',
        birth_date: '',
        team_id: safeTeamId,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('teams-member-add'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // CSRFトークン取得
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    //ページタイトル
    const pagetitle = "チーム";

    return (
        <AuthenticatedLayout    header={
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={24} height={24}><path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/></svg>{pagetitle}
            </h1>
        }
    >
        <Head title={pagetitle} />
            {teamMembers.length > 0 ? (
                <>
                    <p>ログインURLはこちら</p>
                    <p className="break-all">URL: {loginChildUrl}</p>
                    {qrCodeBase64 && (
                        <div>
                            <p>QRコード:</p>
                            <img src={qrCodeBase64 ?? ''} alt="ログインQRコード" />
                        </div>
                    )}
                </>
            ) : (
                <p>現在メンバーはいません。</p>
            )}

            {/* ユーザーが管理者ならフォームを表示 */}
            {user?.role === 10 ? (
                <form onSubmit={handleSubmit}>
                    <TextInput id="csrf" type="hidden" name="_token" value={csrfToken.current} required />
                    <TextInput id="team_id" type="hidden" name="team_id" value={data.team_id} required />

                    <div>
                        <InputLabel htmlFor="childs_name" value="新しいメンバー名" />
                        <TextInput
                            id="childs_name"
                            name="childs_name"
                            value={data.childs_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('childs_name', e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center gap-2 mt-2'>
                        <Checkbox
                            name="role_child"
                            checked={data.role_child === 0}
                            onChange={(e) => setData('role_child', e.target.checked ? 0 : 1)}
                        />
                        <InputLabel
                            htmlFor="role_child"
                            value="管理者権限"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="birth_date" value="生年月日" />
                        <TextInput
                            id="birth_date"
                            type="date"
                            name="birth_date"
                            value={data.birth_date}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('birth_date', e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-5">
                        <InputLabel htmlFor="password" value="仮パスワード" />
                        <TextInput
                            id="password"
                            type="text"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-5">
                        <InputLabel htmlFor="password_confirmation" value="パスワード（確認）" />
                        <TextInput
                            id="password_confirmation"
                            type="text"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>

                    <div className="my-4 flex items-center justify-end">
                        <PrimaryButton className="mx-auto" disabled={processing}>
                            登録
                        </PrimaryButton>
                    </div>
                </form>
            ) : (
                <Link href={route('login')} className="text-sm text-gray-600 underline">
                    チームページへ
                </Link>
            )}
        </AuthenticatedLayout>
    );
}
