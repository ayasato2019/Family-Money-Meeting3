import InputSelect from '@/Components/InputSelect';

export default function InputSelectInterval() {
    return (
        <>
            <InputSelect
                className='max-w-16 dark:text-black'
                options={[
                    { value: 'monthly', label: '毎月' },
                    { value: 'weekly', label: '毎週' },
                    { value: 'biweekly', label: '隔週' },
                    { value: 'daily', label: '毎日' },
                ]}
            />
        </>
    );
}
