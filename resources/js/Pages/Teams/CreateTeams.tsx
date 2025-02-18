import { useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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

    return (
        <AuthenticatedLayout>
            <Head title="チーム登録" />
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
                    <TextInput
                        id="csrf"
                        type="hidden"
                        name="_token"
                        value={csrfToken.current}
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

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            チームがある場合はチームページへ
                        </Link>

                        <PrimaryButton
                            className="ms-4"
                            disabled={processing}
                        >登録</PrimaryButton>
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
