import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
                    <ShieldCheck className="w-7 h-7 text-emerald-600" />
                    <span>Sahayak</span>
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link href="/#about" className="hover:text-emerald-600 transition hidden sm:inline">
                        How It Works
                    </Link>
                    <Link
                        href="/quiz"
                        className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-emerald-700 transition shadow-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Check Eligibility</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}