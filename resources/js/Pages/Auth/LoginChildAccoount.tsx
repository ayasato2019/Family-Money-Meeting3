import { useRef } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function LoginChildAccount({
    status,
    canResetPassword,
    teamId,
}: {
    teamId: string;
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        birth_date: string;
        password: string;
        remember: boolean;
        team_id: string; // teamId で定義されている
    }>({
        birth_date: '',
        password: '',
        remember: false,
        team_id: teamId, // teamId に修正！
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('Submitting form...'); // デバッグ用ログ
        console.log(data); // 送信データを確認

        post(route('login-child-confirm'), {
            onFinish: () => reset('password'),
        });
    };

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);


    return (
        <GuestLayout>
            <Head title="Login" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <form onSubmit={submit}>
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
                />
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


                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
