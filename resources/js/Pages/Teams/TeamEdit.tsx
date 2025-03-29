import { useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';
import { AuthPageProps } from '@/types/AuthPageProps';
import { TeamTypes } from '@/types/tableTeamsData';

interface PageProps extends AuthPageProps {
    team_id: number;
    team_members: {
        id: number;
        name: string;
    }[];
    loginChildUrl: string;
    qrCodeBase64: string;
}

export default function MemberAddContents() {
    const { auth, team_id, team_members, loginChildUrl, qrCodeBase64, } = usePage< PageProps>().props;

    const user = auth?.user || null;
    const safeTeamId: number = team_id ?? 0;
    const teamMembers: TeamTypes[] = (team_members ?? []) as TeamTypes[];

    console.log('受け渡し値' + qrCodeBase64);

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
        <>
            {teamMembers.length > 0 ? (
                <>
                <details className='accordion'>
                    <summary>ログインURL</summary>
                    <p className="break-all">URL: {loginChildUrl}</p>
                    {qrCodeBase64 && (
                        <div>
                            <p>QRコード:</p>
                            <img src={qrCodeBase64 ?? ''} alt="ログインQRコード" />
                        </div>
                    )}
                </details>
                </>
            ) : (
                <p>現在メンバーはいません。</p>
            )}

            {/* ユーザーが管理者ならフォームを表示 */}
            {user?.role === 10 ? (
                <details className="accordion">
                    <summary>メンバーを追加</summary>
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
                </details>
            ) : (''
            )}
        </>
    );
}
