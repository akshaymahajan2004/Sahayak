import Link from "next/link";
import { CheckCircle2, FileText, Search, Shield, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Zero Jargon • 100% Free • Privacy First</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Discover Public Welfare Schemes You Qualify For in <span className="text-emerald-600">Under 2 Minutes</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
          Sahayak eliminates bureaucratic confusion by instantly matching your profile with government welfare schemes, subsidies, and grants with a simple document checklist.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quiz"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <span>Start Eligibility Check</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How Sahayak Helps You</h2>
            <p className="text-slate-600 mt-2">Three simple steps to claim your public entitlements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">1. Answer 5 Quick Questions</h3>
              <p className="text-sm text-slate-600">Enter basic details like age, occupation, and income bracket. No sensitive IDs required.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">2. Instant Matching Engine</h3>
              <p className="text-sm text-slate-600">Our engine scans criteria across education, agriculture, business, and healthcare schemes.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">3. Get Ready-to-Apply List</h3>
              <p className="text-sm text-slate-600">View eligible schemes alongside a personalized document checklist before applying.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Sahayak. Empowering citizens through open civic technology.</p>
      </footer>
    </div>
  );
}