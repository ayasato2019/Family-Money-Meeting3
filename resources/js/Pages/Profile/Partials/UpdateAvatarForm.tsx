import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function UpdateAvatarForm({ className = '' }: { className?: string }) {
    const user = usePage().props.auth.user;

    // フォームデータの管理
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        avatar: user.avatar ? Number(user.avatar) : 1,
    });

    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    useEffect(() => {
        setSelectedAvatar(String(data.avatar));
    }, [data.avatar]);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log("送信するデータ:", data.avatar);
        patch(route('avatar-update'), { preserveScroll: true });
    };


    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/storage/images/avatar/`;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アバターの変更</h2>
            </header>

            {/* ✅ 選択中のアバターを表示 */}
            <div className="mt-4 flex justify-center">
                <img
                    key={`selected-avatar-${selectedAvatar}`}
                    src={`${imageUrl}avatar_${selectedAvatar}.webp`}
                    alt="選択中のアバター"
                    className="!w-24 !h-24 rounded-full border-2 border-gray-300 transition-all duration-200"
                />
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel value="アバターを選択" />

                    <div className="mt-2 grid grid-cols-5 gap-1">
                        {Array.from({ length: 5 }, (_, i) => {
                            const avatarNumber = i + 1;
                            return (
                                <label key={`avatar-label-${avatarNumber}`} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="avatar"
                                        value={avatarNumber}
                                        checked={Number(data.avatar) === avatarNumber}
                                        onChange={(e) => setData('avatar', Number(e.target.value))}
                                        className="hidden"
                                    />
                                    <img
                                        key={`avatar-${avatarNumber}`}
                                        src={`${imageUrl}avatar_${avatarNumber}.webp`}
                                        alt={`アバター ${avatarNumber}`}
                                        className={`!w-16 !h-16 rounded-full border-2 transition ${
                                            Number(data.avatar) === avatarNumber ? 'border-blue-500 scale-110' : 'border-gray-300'
                                        }`}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                <div className="flex items-center gap-4 mt-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">保存しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
