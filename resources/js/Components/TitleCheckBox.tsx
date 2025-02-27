import CheckBoxCommon from '@/Components/CheckboxCommon';
import CheckBoxMinus from '@/Components/CheckboxMinus';
import CheckBoxPlus from '@/Components/CheckboxPlus';

export default function TitleCheckBox({
    className = '',
    title,
    type, // 収入か支出か
    ...props
}: {
    title: string,
    className?: string,
    // type: 3 | 2 | 1 //３共有 2マイナス 1プラス
    type: number //３共有 2マイナス 1プラス
}) {

    const CheckBoxComponent =
        type === 2 ? CheckBoxMinus :
            type === 1 ? CheckBoxPlus :
                CheckBoxCommon;

    return (
        <label className={`relative flex flex-nowrap items-center justify-center gap-3 w-auto ` + className}>
                <CheckBoxComponent {...props} />
                <h3
                    className={
                        'inline-block py-1 w-fit text-lg font-semibold leading-none focus:outline-none ' +
                        className
                    }
                >{title}</h3>
        </label>
    );
}
