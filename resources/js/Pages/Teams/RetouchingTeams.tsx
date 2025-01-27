import { useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/ButtonPrimary';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type FormDataType = {
    team_name: string;
    address: string;
    admin_type: number;
}

export default function TeamsRegister() {
    const admin_type = usePage().props.auth.user.admin_type;
    const team_name = usePage().props.team_name;
    const team_address = usePage().props.team_address ?? ''; // デフォルト値を空文字列に
    // 型アサーションを使う（暫定対応）
    const team_name_str: string = (team_name as { team_name: string }).team_name;
    const team_address_str: string = team_address as string;

    // useFormフックを使ってフォームデータを管理
    const { data, setData, post, processing } = useForm<FormDataType>({
        team_name: team_name_str,
        address: '',
        admin_type: admin_type,
    });

    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('./teams_retouching_done');
    };

    return (
        <AuthenticatedLayout>
            <Head title="チーム名編集" />
            {admin_type === 0 ? (
                <form onSubmit={handleSubmit}>
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
                            id="team_name"
                            name="team_name"
                            value={data.team_name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('team_name', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="住所" />
                        {team_address_str !== null ? (
                            <p>{team_address_str}</p>
                        ) : ''}
                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('address', e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            更新
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
