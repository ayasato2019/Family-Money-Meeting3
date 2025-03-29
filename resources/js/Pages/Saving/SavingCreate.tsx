import { useForm } from "@inertiajs/react";
import { useRef } from 'react';
import { usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FarstView from '@/Objects/FarstView';
import TitleSection from '@/Components/TitleSection';
import TitleModal from '@/Objects/TitleModal';
import ButtonPrimary from '@/Components/ButtonPrimary';
import InputPrice from '@/Components/InputPrice';
import InputText from '@/Components/InputText';
import InputDate from '@/Components/InputDate';
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";

export default function SavingCreate() {
    const { data, setData, post, reset, processing } = useForm({
        goal_id: "",
        title: "",
        amount: 0,
        deadline: "",
        level: 1,
        images: "",
        is_shared: 0, // Ensure this is a boolean
        memo: "",
    });

    const handleChange = (field: string, value: string) => {
        setData({
            ...data,
            [field]: value,
        });
    };

    // 画面タイトル
    const pagetitle = "ちょきん";


    // CSRF token for security
    const metaCsrfToken = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    // Handle form submission
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        post("/saving_registration", {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={<h1 className="w-full flex items-center justify-center text-xl font-semibold leading-tight text-gray-800">{pagetitle}</h1>}>
            <Head title={pagetitle} />

            <FarstView category={1} />
            <div className="overflow-hidden flex items-center justify-center w-full h-full">
                <div className="contents_box w-full">
                    <div className="flex flex-col gap-8">
                        <form onSubmit={handleRegister}>
                            <input type="hidden" name="_token" value={csrfToken.current} />
                            <input type="hidden" name="level" value={1} />
                            <div className="flex flex-col gap-5 p-5">
                                <TitleModal title="もくひょうを 立てよう！" />
                                <div>
                                    <label className="flex flex-col items-center justify-start gap-1">
                                        <span>もくひょう</span>
                                        <InputText
                                            name='title'
                                            value={data.title}
                                            placeholder="(れい) 宇宙飛行士になりたい"
                                            onChange={(e) => handleChange('title', e.target.value)}
                                            className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="flex flex-col items-center justify-between gap-1">
                                    <span>いつ までに たっせい する？</span>
                                    <InputDate
                                        name='deadline'
                                        value={data.deadline}
                                        onChange={(e) => handleChange('deadline', e.target.value)}
                                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col items-center justify-between gap-1">
                                    <span>いくら ためる？</span>
                                    <InputPrice
                                        name='amount'
                                        value={data.amount}
                                        onChange={(e) => handleChange('amount', e.target.value)}
                                        className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="flex flex-col items-center justify-between gap-1">
                                        <span>メモを かこう</span>
                                        <InputText
                                            name='memo'
                                            value={data.memo}
                                            onChange={(e) => handleChange('memo', e.target.value)}
                                            className="w-full mt-1 text-black placeholder:italic placeholder:text-darkgray focus:outline-2 focus:outline-purple"
                                        />
                                    </label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        name="is_share"
                                        checked={data.is_shared === 0}
                                        onChange={(e) => setData("is_shared", e.target.checked ? 0 : 1)}
                                    />
                                    <InputLabel htmlFor="is_share" value="家族と共有する" />
                                </div>
                                <div className="mx-auto mt-5">
                                    <ButtonPrimary type="submit">登録</ButtonPrimary>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
