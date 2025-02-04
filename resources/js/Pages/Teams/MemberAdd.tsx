import { useRef} from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormEventHandler } from 'react';


interface TeamMember {
    name: string;
    id: number;
}

export default function MemberAdd({
    teamMembers,
    team_id,
    appUrl,
}: {
    appUrl: string;
    team_id: number;
    teamMembers: TeamMember[];
}) {

    // useFormフックを使ってフォームデータを管理
    const { data, setData, post, processing, errors, reset  } = useForm<{
        childs_name: string;
        role_child: number;
        password: string;
        password_confirmation: string,
        birth_date: string,
        team_id: number,
    }>({
        childs_name: '',
        role_child: 1,
        password: 'password',
        password_confirmation: 'password',
        birth_date: '',
        team_id: team_id,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('teams-member-add'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    console.log(appUrl);

    // 動的生成URL
    const loginChildUrl = `${appUrl}/login-child?team_id=${encodeURIComponent(team_id)}`;

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    return (
        <AuthenticatedLayout>
            <Head title="メンバー追加" />
            {/* チームメンバー一覧 */}
            {teamMembers.length > 0 ? (
                <>
                    <h2>メンバー一覧</h2>
                    <ul className='mb-5'>
                        {teamMembers.map((member) => (
                            <li key={member.id}>{member.name}</li>
                        ))}
                    </ul>
                    <p>ログインURLはこちら</p>
                    <p>ulr: {loginChildUrl}</p>
                </>
            ) : (
                <p>現在メンバーはいません。</p>
            )}

            <form onSubmit={handleSubmit}>

                <TextInput
                    id="csrf"
                    type="hidden"
                    name="_token"
                    value={csrfToken.current}
                    className="mt-1 block w-full"
                    required
                />
                <TextInput
                    id="team_id"
                    type="hidden"
                    name="team_id"
                    value={data.team_id}
                    className="mt-1 block w-full"
                    required
                />

                <div>
                    <InputLabel htmlFor="childs_name" value="新しいメンバー名" />

                    <TextInput
                        id="childs_name" // idを修正
                        name="childs_name" // name属性を修正
                        value={data.childs_name} // useFormの状態を反映
                        className="mt-1 block w-full"
                        autoComplete="childs_name"
                        isFocused={true}
                        onChange={(e) => setData('childs_name', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <InputLabel htmlFor="role_child" value="管理者権限" />

                    <Checkbox
                        name="role_child"
                        checked={data.role_child === 0}
                        onChange={(e) =>
                            setData('role_child', e.target.checked ? 0 : 1)  // チェックありなら0、なしなら1
                        }
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
                        autoComplete="birthday"
                        onChange={(e) => setData('birth_date', e.target.value)}
                        required
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>

                <div className='mt-5'>
                    <InputLabel htmlFor="password" value="仮パスワード" />
                    <p className='text-sm'>初期では「password」と設定されています。</p>
                    <p className='text-sm'>アカウントを渡したら、すぐにパスワードの変更をお願いします。</p>

                    <TextInput
                        id="password"
                        type="text"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder ='半角英数字'
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className='mt-5'>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="パスワード（確認）"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="text"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        placeholder ='半角英数字'
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        登録
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
