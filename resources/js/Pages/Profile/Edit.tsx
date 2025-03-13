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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

                <ul className="mx-auto max-w-7xl space-y-6">
                    <li className="">
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
