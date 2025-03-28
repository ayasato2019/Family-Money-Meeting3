import BadgeType from '@/Components/BadgeType';
import ConvertPrice from '@/Components/ConvertPrice';

export default function InputSelectInterval({
    isOpen,
    savings,
    investment,
    essential,
    extravagance,
    plannedExtravagance,
    donation,
}: {
    isOpen: boolean;
    savings: number;
    investment: number;
    essential: number;
    extravagance: number;
    plannedExtravagance: number;
    donation: number;
}) {

    const assets = savings + investment;
    const expense = essential + donation;
    const left = extravagance;

    return (
        <div className="overflow-hidden flex flex-col items-start justify-center gap-1 bg-gray-900/85 px-2 pt-0.5 pb-1 rounded-md max-w-80 shadow-xl text-white">
            <div className="flex items-center justify-between gap-2 pb-0.5 w-full h-auto border-b border-dotted border-white pr-3">
                <BadgeType variant="assets" />
                <p className="text-sm"><ConvertPrice price={assets} /></p>
            </div>
            <div className="flex items-center justify-between gap-2 pb-0.5 w-full h-auto border-b border-dotted border-white pr-3">
                <BadgeType variant="liabilities" />
                <p className="text-sm "><ConvertPrice price={expense} /></p>
            </div>
            <div className="flex items-center justify-between gap-2 w-full h-auto">
                <div className="flex items-center justify-center gap-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="button-savig w-5 h-5"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                    <p className="text-sm font-semibold">よゆう</p>
                </div>
                <div className="relative flex items-center justify-center gap-0.5 pr-3">
                    <p className="text-md mb-0.5 font-bold"><ConvertPrice price={left} /></p>
                    <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" fill="none" className={`transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                            }`}><path fill="#FFF" d="M4.655 3.933a1 1 0 0 1-1.31 0L.831 1.756C.131 1.15.561 0 1.486 0h5.028c.926 0 1.354 1.15.655 1.756z" /></svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
