import { useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/ButtonPrimary';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function FirstStep({
    saving,
    investment,
    need,
    want,
    donation,
    is_share,
}: {
    saving: number,
    investment: number,
    need: number,
    want: number,
    donation: number,
    is_share: number,
}) {
    const { data, setData, post, processing } = useForm<{
        saving: number,
        investment: number,
        need: number,
        want: number,
        donation: number,
        is_share: number,
    }>({
        saving: saving,
        investment: investment,
        need: need,
        want: want,
        donation: donation,
        is_share: is_share,
    });

    // 送信関係
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('./status_registration');
    };


    return (
        <div className="">
            <h1>ステータス</h1>
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

                <div className="mt-4">
                    <InputLabel htmlFor="is_share" value="ステータスはヒミツにする" />

                    <Checkbox
                        id="is_share"
                        name="is_share"
                        checked={data.is_share === 1}
                        autoComplete="is_share"
                        onChange={(e) => setData('is_share', e.target.checked ? 1 : 0)}
                    />

                    {/* <InputError message="生年月日を登録してください" className="mt-2" /> */}
                </div>
                <PrimaryButton className="ms-4" disabled={processing}
                >登録</PrimaryButton>
            </form>
        </div>
    )
}
