import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string,
        email: string,
        password: string,
        password_confirmation: string,
        birth_date: string,
        role: number,
        avatar: number,
        is_active: number,
    }> ({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        birth_date: '',
        role: 10,
        avatar: 1,
        is_active: 10,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/build/assets/images/avatar/`;

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <TextInput
                    id="role"
                    type="hidden"
                    name="role"
                    value={data.role}
                />
                <TextInput
                    id="is_active"
                    type="hidden"
                    name="is_active"
                    value={data.is_active}
                />
                <div>
                    <InputLabel htmlFor="name" value="ユーザー名（チーム内で表示する名前）" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        placeholder ='例）ママ'
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="avatar" value="アバター" />
                        <div className="mt-4 flex justify-center">
                            <img
                                key={selectedAvatar}
                                src={`${imageUrl}avatar_${selectedAvatar}.webp`}
                                alt="選択中のアバター"
                                className="!w-24 !h-24 rounded-full border-2 border-gray-300 transition-all duration-200"
                            />
                        </div>

                    <div className="mt-2 grid grid-cols-5 gap-1">
                        <label key={1} className="cursor-pointer">
                            <input
                                type="radio"
                                name="avatar"
                                value={1}
                                checked={Number(data.avatar) === 1}
                                onChange={(e) => {
                                    setData('avatar', Number(e.target.value));
                                }}
                                className="hidden"
                            />
                            <img
                                key={1}
                                src={`${imageUrl}avatar_1.webp`}
                                alt={`アバター1`}
                                className={`!w-16 !h-16 rounded-full border-2 transition ${
                                    Number(data.avatar) === 1 ? 'border-blue-500 scale-110' : 'border-gray-300'
                                }`}
                                />
                        </label>
                        <label key={2} className="cursor-pointer">
                            <input
                                type="radio"
                                name="avatar"
                                value={2}
                                checked={Number(data.avatar) === 2}
                                onChange={(e) => {
                                    setData('avatar', Number(e.target.value));
                                }}
                                className="hidden"
                            />
                            <img
                                key={2}
                                src={`${imageUrl}avatar_2.webp`}
                                alt={`アバター2`}
                                className={`!w-16 !h-16 rounded-full border-2 transition ${
                                    Number(data.avatar) === 2 ? 'border-blue-500 scale-110' : 'border-gray-300'
                                }`}
                            />
                        </label>
                        <label key={3} className="cursor-pointer">
                            <input
                                type="radio"
                                name="avatar"
                                value={3}
                                checked={Number(data.avatar) === 3}
                                onChange={(e) => {
                                    setData('avatar', Number(e.target.value));
                                }}
                                className="hidden"
                            />
                            <img
                                key={3}
                                src={`${imageUrl}avatar_3.webp`}
                                alt={`アバター3`}
                                className={`!w-16 !h-16 rounded-full border-2 transition ${
                                    Number(data.avatar) === 2 ? 'border-blue-500 scale-110' : 'border-gray-300'
                                }`}
                            />
                        </label>
                        <label key={4} className="cursor-pointer">
                            <input
                                type="radio"
                                name="avatar"
                                value={3}
                                checked={Number(data.avatar) === 3}
                                onChange={(e) => {
                                    setData('avatar', Number(e.target.value));
                                }}
                                className="hidden"
                            />
                            <img
                                key={4}
                                src={`${imageUrl}avatar_4.webp`}
                                alt={`アバター4`}
                                className={`!w-16 !h-16 rounded-full border-2 transition ${
                                    Number(data.avatar) === 2 ? 'border-blue-500 scale-110' : 'border-gray-300'
                                }`}
                            />
                        </label>
                        <label key={5} className="cursor-pointer">
                            <input
                                type="radio"
                                name="avatar"
                                value={5}
                                checked={Number(data.avatar) === 5}
                                onChange={(e) => {
                                    setData('avatar', Number(e.target.value));
                                }}
                                className="hidden"
                            />
                            <img
                                key={5}
                                src={`${imageUrl}avatar_5.webp`}
                                alt={`アバター5`}
                                className={`!w-16 !h-16 rounded-full border-2 transition ${
                                    Number(data.avatar) === 2 ? 'border-blue-500 scale-110' : 'border-gray-300'
                                }`}
                            />
                        </label>
                    </div>
                    <InputError message={errors.avatar} className="mt-2" />
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

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder ='例）example@xxxx.com'
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
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

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="パスワード（確認）"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
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

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        アカウントがある場合はログイン
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        登録
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
