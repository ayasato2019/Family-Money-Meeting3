import { PageProps } from '@/types';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState, useEffect, useRef } from "react"
import { Head, Link } from '@inertiajs/react';

export default function Home({
    auth,
    }: PageProps) {
    // State for mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // State for FAQ accordion
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

    // State for loading screen
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    // Refs for thumbnail slideshows
    const rtlRef = useRef<HTMLDivElement>(null)
    const ltrRef = useRef<HTMLDivElement>(null)

    // Handle scroll for header shadow
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Loading screen effect
    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
        setProgress((prevProgress) => {
            const newProgress = prevProgress + 5
            if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
                setLoading(false)
            }, 500)
            return 100
            }
            return newProgress
        })
        }, 100)

        return () => clearInterval(interval)
    }, [])

    // Thumbnail slideshow effect
    useEffect(() => {
        const rtlInterval = setInterval(() => {
        if (rtlRef.current) {
            rtlRef.current.scrollLeft += 1
            if (rtlRef.current.scrollLeft >= rtlRef.current.scrollWidth - rtlRef.current.clientWidth) {
            rtlRef.current.scrollLeft = 0
            }
        }
        }, 20)

        const ltrInterval = setInterval(() => {
        if (ltrRef.current) {
            ltrRef.current.scrollLeft -= 1
            if (ltrRef.current.scrollLeft <= 0) {
            ltrRef.current.scrollLeft = ltrRef.current.scrollWidth - ltrRef.current.clientWidth
            }
        }
        }, 20)

        return () => {
        clearInterval(rtlInterval)
        clearInterval(ltrInterval)
        }
    }, [])

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        document.body.style.overflow = !isMenuOpen ? "hidden" : ""
    }

    // Toggle FAQ accordion
    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    // アバター画像の URL を構築
    const appUrl = import.meta.env.VITE_APP_URL?.replace(/\/$/, "");
    const imageUrl = `${appUrl}/storage/images/`;

    // // FAQ data
    // const faqItems = [
    //     {
    //     question: "お小遣いはどのように分けるのがいいですか？",
    //     answer:
    //         "お小遣いは「使う」「貯める」「寄付する」の3つに分けるのがおすすめです。例えば、50%を好きなものに使い、40%を将来の大きな買い物のために貯め、10%を誰かのために使うという分け方が一般的です。",
    //     },
    //     {
    //     question: "何歳からお金の管理を始めるべきですか？",
    //     answer:
    //         "お金の基本的な概念は5〜6歳から理解できるようになりますが、お小遣い管理は小学校低学年（7〜8歳）から始めるのが適切です。Family Money Meetingアプリは10歳前後のお子さんを対象にしていますが、保護者のサポートがあれば、もう少し小さなお子さんでも使えます。",
    //     },
    //     {
    //     question: "子どもがお金を全部使ってしまったらどうすればいいですか？",
    //     answer:
    //         "これは大切な学びの機会です。お金を使い切ってしまった場合は、次のお小遣いまで待つことで、計画的な使い方を学ぶことができます。無計画な使い方の自然な結果を経験することで、将来的により賢い選択ができるようになります。",
    //     },
    //     {
    //     question: "貯金の目標の立て方を教えてください",
    //     answer:
    //         "子どもが本当に欲しいものを目標にするのが効果的です。目標金額と期間を設定し、毎週いくら貯めれば達成できるかを一緒に計算しましょう。Family Money Meetingアプリでは、目標設定と進捗の視覚化ができるので、子どもが自分で達成感を味わえます。",
    //     },
    // ]

    return (
        <>
        {/* Loading Screen */}
        {loading && (
            <div className="fixed inset-0 bg-gradient-to-r from-primary-400 to-green-400 z-50 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white mb-8">Family Money Meeting</div>
            <div className="w-64 h-4 bg-white/30 rounded-full overflow-hidden">
                <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
                ></div>
            </div>
            </div>
        )}

        {/* Header */}
        <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="z-10">
                <Link href="/" className="flex items-center gap-2">
                <span className="text-3xl">💰</span>
                <span className="font-bold text-xl bg-gradient-to-r from-primary-500 to-green-500 bg-clip-text text-transparent">
                    Family Money Meeting
                </span>
                </Link>
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
                <ul className="flex gap-6">
                <li>
                    <Link href="#about" className="hover:text-primary-500">
                    FMMって？
                    </Link>
                </li>
                <li>
                    <Link href="#features" className="hover:text-primary-500">
                    できること
                    </Link>
                </li>
                <li>
                    <Link href="#howto" className="hover:text-primary-500">
                    使い方
                    </Link>
                </li>
                {/* <li>
                    <Link href="#faq" className="hover:text-primary-500">
                    よくある質問
                    </Link>
                </li> */}
                <li>
                    <Link
                    href="/register"
                    className="bg-gradient-to-r from-primary-500 to-green-500 hover:opacity-90 text-white px-4 py-2 rounded-full font-medium"
                    >
                    はじめる
                    </Link>
                </li>
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden z-10 relative w-10 h-10 flex flex-col justify-center items-center"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span
                className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-1" : ""}`}
                ></span>
                <span
                className={`block w-6 h-0.5 bg-black my-1 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
                ></span>
            </button>
            </div>

            {/* Mobile Navigation */}
            <div
            className={`fixed inset-0 bg-white z-40 transition-transform duration-300 transform lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-4xl">💰</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-primary-500 to-green-500 bg-clip-text text-transparent">
                    Family Money Meeting
                    </span>
                </div>
                </div>

                <nav>
                <ul className="space-y-4">
                    <li>
                    <Link href="#about" className="block py-2 text-center text-lg" onClick={toggleMenu}>
                        FMMって？
                    </Link>
                    </li>
                    <li>
                    <Link href="#features" className="block py-2 text-center text-lg" onClick={toggleMenu}>
                        できること
                    </Link>
                    </li>
                    <li>
                    <Link href="#howto" className="block py-2 text-center text-lg" onClick={toggleMenu}>
                        使い方
                    </Link>
                    </li>
                    {/* <li>
                    <Link href="#faq" className="block py-2 text-center text-lg" onClick={toggleMenu}>
                        よくある質問
                    </Link>
                    </li> */}
                    <li>
                    <Link
                        href="/register"
                        className="block mx-auto w-fit mt-4 bg-gradient-to-r from-primary-500 to-green-500 hover:opacity-90 text-white px-6 py-2 rounded-full font-medium"
                        onClick={toggleMenu}
                    >
                        はじめる
                    </Link>
                    </li>
                </ul>
                </nav>
            </div>
            </div>
        </header>

        <main>
            {/* Hero Section */}
            <div className="relative w-full py-20 bg-gradient-to-r from-primary-500 to-green-500 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                <div className="text-white text-center md:text-left md:w-1/2 mb-10 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    お小遣いの使い方を
                    <br />
                    楽しく学ぼう！
                    </h2>
                    <p className="text-lg mb-8">
                    Family Money Meetingは、子どもたちがお金の価値を理解し、 賢い使い方を身につけるためのアプリです。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                        href="/register"
                        className="bg-white text-primary-500 hover:bg-gray-100 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2"
                    >
                        <span className="inline-block">🚀</span>
                        今すぐはじめる
                    </Link>
                    <Link
                        href="#about"
                        className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2"
                    >
                        <span className="inline-block">📖</span>
                        もっと詳しく
                    </Link>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <img
                    src={`${imageUrl}/top/bg_toppage_mv.jpg`}
                    alt="Family Money Meeting App"
                    width={400}
                    height={400}
                    className="rounded-xl shadow-lg"
                    />
                </div>
                </div>
            </div>
            </div>

            {/* About Section */}
            <section id="about" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2">FMMって？</h2>
                <p className="text-center text-gray-500 mb-12">About Family Money Meeting</p>

                <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md relative transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 bg-primary-200 text-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">💡</span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">
                    日本の<span className="text-primary-500">金融教育</span>の課題
                    </h4>
                    <p className="text-gray-600">
                    日本では金融教育が義務教育に含まれていないため、お金の管理について学ぶ機会が少ないのが現状です。多くの子どもたちがお金の使い方を体系的に学ばないまま大人になっています。
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md relative transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 bg-primary-200 text-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">🌍</span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">
                    <span className="text-primary-500">世界の潮流</span>と日本の現状
                    </h4>
                    <p className="text-gray-600">
                    諸外国では10歳前後から金融教育に取り組んでいます。高校生では企業や投資について学び、リテラシーを高めています。
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md relative transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 bg-primary-200 text-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">🎯</span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">
                    <span className="text-primary-500">バランス感覚</span>を育てる
                    </h4>
                    <p className="text-gray-600">
                    このアプリは子どもたちが、「貯める」「投資する」「寄付する」「使う」の４原則をもとに、さらに「必要」と「欲しい」に分類することで、お金のバランス感覚を養います。
                    </p>
                </div>
                </div>
            </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">できること</h2>
                <p className="text-gray-500">Features</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-xl relative transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">💸</span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">
                    <span className="bg-primary-200 px-2 rounded">お小遣いの分類管理</span>
                    </h4>
                    <p className="text-gray-700">
                    お小遣いを「貯める」「投資する」「寄付する」必要」「欲しい」の5つに分けて記録できます。それぞれの目的に合わせた使い方を視覚的に理解できるので、計画的な管理が身につきます。
                    </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl relative transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">🎯</span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">
                    <span className="bg-primary-200 px-2 rounded">目標設定と達成管理</span>
                    </h4>
                    <p className="text-gray-700">
                    欲しいものや寄付したい対象を目標として設定し、進捗を管理できます。目標達成までの道のりを視覚化することで、貯金の楽しさや達成感を体験できます。
                    </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl relative transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">📊</span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-center">
                    <span className="bg-primary-200 px-2 rounded">家族で収支を確認</span>
                    </h4>
                    <p className="text-gray-700">
                    お小遣いの使い道だけでなく家計簿のシェア機能もあり、「お金について意見し合う」場を提供します。家族のバランス感覚から、お子様がさらに学びを得られることを期待しています。見せたくない収支は非公開にもできます。
                    </p>
                </div>
                </div>

                {/* <div className="mt-16 flex justify-center">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl">
                    <img
                    src="/placeholder.svg?height=500&width=800&text=App+Features+Screenshot"
                    alt="Family Money Meeting Features"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                    />
                </div>
                </div> */}
            </div>
            </section>

            {/* How To Use Section */}
            <section id="howto" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2">使い方</h2>
                <p className="text-center text-gray-500 mb-12">How To Use</p>

                <div className="space-y-8 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-md transform transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-500 to-green-500 text-white py-1 px-3 rounded-full flex-shrink-0">
                        <span className="text-xl text-white font-bold">1</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-3">アカウント作成</h4>
                        <p className="text-gray-600">
                        保護者の方がアカウントを作成し、お子さんのプロフィールを登録します。チームページの特別なURLからログインすると、チームの一員として活動できます。
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md transform transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-500 to-green-500 text-white py-1 px-3 rounded-full flex-shrink-0">
                        <span className="text-xl text-white font-bold">2</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-3">お小遣いの設定</h4>
                        <p className="text-gray-600">
                        お小遣いの金額と頻度（毎週・毎月など）を設定します。また、「使う」「貯める」「寄付する」の割合も設定できます。最初は50%・40%・10%の割合がおすすめです。
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md transform transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-500 to-green-500 text-white py-1 px-3 rounded-full flex-shrink-0">
                        <span className="text-xl text-white font-bold">3</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-3">目標設定</h4>
                        <p className="text-gray-600">
                        「貯める」カテゴリーでは欲しいものを目標として設定し、金額と期間を決めます。「寄付する」カテゴリーでは寄付先や目標金額を設定できます。目標設定は子どもと一緒に行うことで、より効果的です。
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md transform transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-500 to-green-500 text-white py-1 px-3 rounded-full flex-shrink-0">
                        <span className="text-xl text-white font-bold">4</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-3">日々の記録</h4>
                        <p className="text-gray-600">
                        お子さんが使ったお金を記録します。何に使ったか、どのカテゴリーから使ったかを選択するだけの簡単操作です。写真も添付できるので、購入したものや寄付した活動の記録も残せます。
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md transform transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-500 to-green-500 text-white py-1 px-3 rounded-full flex-shrink-0">
                        <span className="text-xl text-white font-bold">5</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-3">家族ミーティング</h4>
                        <p className="text-gray-600">
                        家族でお子さんのお金の使い方について気軽にコメントを交わしましょう。アプリのレポート機能を使って、お子さんの成長を一緒に確認し、次の目標や改善点について話し合うことができます。
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* Testimonials
            <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2">利用者の声</h2>
                <p className="text-center text-gray-500 mb-12">Testimonials</p>

                <div className="space-y-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-center transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-full md:w-1/3">
                    <Img
                        src="/placeholder.svg?height=300&width=300&text=Parent"
                        alt="Parent"
                        width={300}
                        height={300}
                        className="rounded-full w-40 h-40 mx-auto"
                    />
                    </div>
                    <div className="w-full md:w-2/3">
                    <h4 className="text-xl font-bold mb-3">子どもが自分からお金の管理をするようになりました</h4>
                    <p className="text-gray-600 mb-4">
                        このアプリを使い始めてから、10歳の息子が自分からお小遣いの管理をするようになりました。特に目標設定機能が気に入っているようで、欲しいゲームのために計画的に貯金しています。以前は全額すぐに使っていましたが、今では将来のために貯める大切さを理解しているようです。
                    </p>
                    <p className="text-sm text-gray-500">田中さん（40代・男の子のお父さん）</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-8 items-center transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-full md:w-1/3">
                    <img
                        src="/placeholder.svg?height=300&width=300&text=Child"
                        alt="Child"
                        width={300}
                        height={300}
                        className="rounded-full w-40 h-40 mx-auto"
                    />
                    </div>
                    <div className="w-full md:w-2/3">
                    <h4 className="text-xl font-bold mb-3">お金を貯めるのが楽しくなった！</h4>
                    <p className="text-gray-600 mb-4">
                        Family Money
                        Meetingを使うようになって、お金を貯めるのが楽しくなりました！欲しかった自転車のために貯金して、半年でついに買うことができました。グラフで貯金が増えていくのを見るのが嬉しいです。お小遣いの一部を動物保護団体に寄付もしています。
                    </p>
                    <p className="text-sm text-gray-500">さくらちゃん（11歳）</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-full md:w-1/3">
                    <img
                        src="/placeholder.svg?height=300&width=300&text=Teacher"
                        alt="Teacher"
                        width={300}
                        height={300}
                        className="rounded-full w-40 h-40 mx-auto"
                    />
                    </div>
                    <div className="w-full md:w-2/3">
                    <h4 className="text-xl font-bold mb-3">教育現場でも活用しています</h4>
                    <p className="text-gray-600 mb-4">
                        小学校の教員として、総合学習の時間にこのアプリを活用しています。子どもたちは視覚的に分かりやすいインターフェースで楽しみながら金融リテラシーを学んでいます。特に「寄付する」という概念を取り入れている点が素晴らしく、社会貢献の意識も同時に育てられます。
                    </p>
                    <p className="text-sm text-gray-500">佐藤先生（小学校教員）</p>
                    </div>
                </div>
                </div>
            </div>
            </section> */}

            {/* FAQ Section */}
            {/* <section id="faq" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-2">よくある質問</h2>
                <p className="text-center text-gray-500 mb-12">FAQ</p>
                </div>

                <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                        onClick={() => toggleFaq(index)}
                    >
                        <span className="font-medium pr-8">{item.question}</span>
                        {openFaqIndex === index ? (
                        <span className="text-xl text-primary-500">▲</span>
                        ) : (
                        <span className="text-xl text-primary-500">▼</span>
                        )}
                    </button>
                    {openFaqIndex === index && (
                        <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                        {item.answer.split("\n").map((paragraph, i) => (
                            <p key={i} className={i > 0 ? "mt-4 text-gray-600" : "text-gray-600"}>
                            {paragraph}
                            </p>
                        ))}
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>
            </section> */}

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-primary-500 to-green-500 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">お子さんの金融教育を今日から始めましょう</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                Family Money Meetingで、お金の価値と賢い使い方を楽しく学びながら、
                将来に役立つ金融リテラシーを身につけましょう。
                </p>
                <Link
                href="/register"
                className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg inline-block"
                >
                無料ではじめる
                </Link>
                <p className="mt-4 text-sm text-white/80">基本機能は無料でご利用いただけます</p>
            </div>
            </section>

            {/* App Screenshots */}
            {/* <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">アプリの画面</h2>

                <div className="overflow-hidden">
                <div ref={rtlRef} className="flex gap-6 w-full overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0">
                        <img
                            src={`/placeholder.svg?height=400&width=200&text=Screen${index + 1}`}
                            alt={`App Screenshot ${index + 1}`}
                            width={200}
                            height={400}
                            className="rounded-xl shadow-lg"
                            />
                    </div>
                    ))} */}
                    {/* Duplicate images for continuous scrolling */}
                    {/* {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`dup-${index}`} className="flex-shrink-0">
                        <img
                        src={`/placeholder.svg?height=400&width=200&text=Screen${index + 1}`}
                        alt={`App Screenshot ${index + 1}`}
                        width={200}
                        height={400}
                        className="rounded-xl shadow-lg"
                        />
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </section> */}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                <div className="mb-6 flex items-center justify-center md:justify-start gap-2">
                    {/* <span className="text-3xl">💰</span> */}
                    <span className="font-bold text-xl">Family Money Meeting</span>
                </div>
                {/* <ul className="flex justify-center md:justify-start gap-4 mb-6">
                    <li>
                    <Link
                        href="#"
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                    >
                        <span className="text-xl">𝕏</span>
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="#"
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                    >
                        <span className="text-xl">📱</span>
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="#"
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                    >
                        <span className="text-xl">📺</span>
                    </Link>
                    </li>
                </ul> */}
                {/* <p className="text-gray-400 mb-4">
                    東京都XXX区XXXXビル１F
                    <br />
                    03-0000-0000
                </p>
                <small className="text-gray-500">Copyright&copy; Family Money Meeting All Rights Reserved.</small> */}
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="space-y-3 text-center md:text-left">
                    <li>
                    <Link href="#about" className="hover:text-purple-400">
                        FMMって？
                    </Link>
                    </li>
                    <li>
                    <Link href="#features" className="hover:text-purple-400">
                        できること
                    </Link>
                    </li>
                    <li>
                    <Link href="#howto" className="hover:text-purple-400">
                        使い方
                    </Link>
                    </li>
                    <li>
                    <Link href="#faq" className="hover:text-purple-400">
                        よくある質問
                    </Link>
                    </li>
                    <li>
                    <Link href="/register" className="hover:text-purple-400">
                        はじめる
                    </Link>
                    </li>
                </ul>

                <ul className="space-y-3 text-center md:text-left">
                    <li>
                    <Link href="/privacy" className="hover:text-purple-400">
                        プライバシーポリシー
                    </Link>
                    </li>
                    <li>
                    <Link href="/terms" className="hover:text-purple-400">
                        利用規約
                    </Link>
                    </li>
                    <li>
                    <Link href="/contact" className="hover:text-purple-400">
                        お問い合わせ
                    </Link>
                    </li>
                    <li>
                    <Link href="/about-us" className="hover:text-purple-400">
                        運営会社
                    </Link>
                    </li>
                </ul>
                </div> */}
            </div>
            </div>
        </footer>
        </>
    )
    }

