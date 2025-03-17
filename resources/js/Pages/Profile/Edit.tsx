import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateUpdateAvatarForm from './Partials/UpdateAvatarForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { router } from '@inertiajs/react';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={18} height={18}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" fill="#374151"/></svg>
                    プロフィール
                </h1>
            }
        >
            <Head title="Profile" />

                <ul className="mx-auto my-10 max-w-7xl space-y-12">
                    <li className="flex justify-center items-center gap-2">
                        <p>ログアウトする？</p>
                        <PrimaryButton
                            onClick={handleLogout}
                        >ログアウト</PrimaryButton>
                    </li>
                    <li className="">
                        <UpdateUpdateAvatarForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </li>
                    <li className="">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </li>
                    <li className="">
                        <UpdatePasswordForm className="max-w-xl" />
                    </li>
                    <li className="">
                        <DeleteUserForm className="max-w-xl" />
                    </li>
                </ul>
        </AuthenticatedLayout>
    );
}
