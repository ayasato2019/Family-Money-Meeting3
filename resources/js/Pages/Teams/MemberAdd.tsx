import { useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/ButtonPrimary';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MemberAdd() {
    const user_id = usePage().props.auth.user.id;
    const admin_type = usePage().props.auth.user.admin_type;
    const team_name = usePage().props.team_name;
    const team_name_str: string = (team_name as { team_name: string }).team_name;
    const admin_child: number = 1;

    // useFormフックを使ってフォームデータを管理
    const { data, setData, post, processing, errors } = useForm({
        childs_name: '',
        admin_child: admin_child,
        password: 'password',
        user_id: user_id,
        admin_type: admin_type,
    });

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('./teams_member_add');
    };

    return (
        <AuthenticatedLayout>
            <Head title="メンバー追加" />
            {admin_type === 0 ? (
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center my-5'>{team_name_str}</h2>
                    {/*親の情報*/}
                    <TextInput
                        id="admin_type"
                        type="hidden"
                        name="admin_type"
                        value={user_id}
                        className="mt-1 block w-full"
                    />
                    <TextInput
                        id="admin_type"
                        type="hidden"
                        name="admin_type"
                        value={admin_type}
                        className="mt-1 block w-full"
                    />
                    <TextInput
                        id="csrf"
                        type="hidden"
                        name="_token"
                        value={csrfToken.current}
                        className="mt-1 block w-full"
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
                        <InputLabel htmlFor="admin_child" value="管理者権限" />

                        <TextInput
                            id="admin_child" // idを修正
                            name="admin_child" // name属性を修正
                            value={data.admin_child} // useFormの状態を反映
                            className="mt-1 block w-full"
                            autoComplete="admin_child"
                            isFocused={true}
                            onChange={(e) => setData('admin_child', Number(e.target.value))}                            required
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

                    <InputError message={errors.password} className="mt-2" />
                </div>

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            登録
                        </PrimaryButton>
                    </div>
                </form>
            ) : (
                <Link
                    href={route('login')}
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >チームページへ</Link>
            )}
        </AuthenticatedLayout>
    );
}
