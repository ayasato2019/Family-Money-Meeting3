import { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface TeamMember {
    name: string;
    team_id: number;
}

export default function MemberAdd({
    teamMembers,
}: {
    teamMembers: TeamMember[];
}) {

    // useFormフックを使ってフォームデータを管理
    const { data, setData, post, processing, errors } = useForm<{
        childs_name: string;
        role_child: boolean;
        password: string;
    }>({
        childs_name: '',
        role_child: false, // role_childはboolean型に初期化
        password: 'password',

    });

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('teams-member-add'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="メンバー追加" />
            {/* チームメンバー一覧 */}
            {teamMembers.length > 0 ? (
                <>
                    <h2>メンバー一覧</h2>
                    <ul className='mb-5'>
                        {teamMembers.map((member) => (
                            <li key={member.team_id}>{member.name}</li>
                        ))}
                    </ul>
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
                        name="remember"
                        checked={data.role_child}
                        onChange={(e) =>
                            setData('role_child', e.target.checked)
                        }
                    />
                </div>

                <div className='mt-5'>
                    <InputLabel htmlFor="password" value="仮パスワード" />
                    <p className='text-sm'>仮なのでシンプルなパスワードでもOKです。</p>
                    <p className='text-sm'>アカウントを渡したらパスワードの変更をお願いします。</p>
                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
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
