import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/ButtonPrimary';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import FarstView from '@/Objects/FarstView';

export default function FirstStep({
    saving,
    investment,
    need,
    want,
    donation,
    is_shared,
}: {
    saving: number,
    investment: number,
    need: number,
    want: number,
    donation: number,
    is_shared: number,
}) {
    const { data, setData, post, processing } = useForm<{
        saving: number,
        investment: number,
        need: number,
        want: number,
        donation: number,
        is_shared: number,
    }>({
        saving: saving,
        investment: investment,
        need: need,
        want: want,
        donation: donation,
        is_shared: is_shared,
    });

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('./status_registration');
    };

    //ページタイトル
    const pagetitle = "ステータス";


    return (
<AuthenticatedLayout
    header={
        <h1 className="flex gap-2 items-center justify-center text-lg font-semibold leading-tight text-[#374151]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={18} height={18}><path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z" fill="#374151"/></svg>
            {pagetitle}
        </h1>
    }
>
    <Head title={pagetitle} />

    <FarstView
        category={0}
    />
        <div className="my-6">
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="csrf"
                    type="hidden"
                    name="_token"
                    value={csrfToken.current}
                    className="mt-1 block w-full"
                />

                <div className="mt-4">
                    <InputLabel htmlFor="saving" value="ちょきん" />

                    <TextInput
                        id="saving"
                        type="number"
                        name="saving"
                        value={data.saving}
                        className="mt-1 block w-full"
                        autoComplete="saving"
                        onChange={(e) => setData('saving', parseInt(e.target.value, 10))}
                        required
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="investment" value="とうし" />

                    <TextInput
                        id="investment"
                        type="number"
                        name="investment"
                        value={data.investment}
                        className="mt-1 block w-full"
                        autoComplete="investment"
                        onChange={(e) => setData('investment', parseInt(e.target.value, 10))}
                        required
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="need" value="ひつよう" />

                    <TextInput
                        id="need"
                        type="number"
                        name="need"
                        value={data.need}
                        className="mt-1 block w-full"
                        autoComplete="need"
                        onChange={(e) => setData('need', parseInt(e.target.value, 10))}
                        required
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="want" value="ほしい" />

                    <TextInput
                        id="want"
                        type="number"
                        name="want"
                        value={data.want}
                        className="mt-1 block w-full"
                        autoComplete="want"
                        onChange={(e) => setData('want', parseInt(e.target.value, 10))}
                        required
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="donation" value="きふ" />

                    <TextInput
                        id="donation"
                        type="number"
                        name="donation"
                        value={data.donation}
                        className="mt-1 block w-full"
                        autoComplete="donation"
                        onChange={(e) => setData('donation', parseInt(e.target.value, 10))}
                        required
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>

                <div className="my-4 flex gap-2 items-center">
                    <Checkbox
                        id="is_shared"
                        name="is_shared"
                        checked={data.is_shared === 1}
                        autoComplete="is_shared"
                        onChange={(e) => setData('is_shared', e.target.checked ? 1 : 0)}
                    />
                    <InputLabel htmlFor="is_shared" value="ステータスはヒミツにする" />
                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>
                <PrimaryButton className="mx-auto" disabled={processing}
                >登録</PrimaryButton>
            </form>
        </div>
</AuthenticatedLayout>
    )
}
