"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { UserProfile } from "@/lib/types";

const OCCUPATIONS = ["Student", "Farmer", "Self-Employed", "Business Owner", "Unemployed", "Retired"];
const CATEGORIES = ["General", "OBC", "SC", "ST"];
const STATES = ["Gujarat", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Other"];

export default function QuizPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // Form state
    const [formData, setFormData] = useState<UserProfile>({
        age: 22,
        annualIncome: 150000,
        occupation: "Student",
        category: "General",
        state: "Gujarat",
    });

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            // Pass data via URL search params to the results page
            const params = new URLSearchParams({
                age: formData.age.toString(),
                income: formData.annualIncome.toString(),
                occupation: formData.occupation,
                category: formData.category,
                state: formData.state,
            });
            router.push(`/results?${params.toString()}`);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                        <span>STEP {step} OF 4</span>
                        <span>{Math.round((step / 4) * 100)}% COMPLETED</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-emerald-600 h-full transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">What is your age?</h2>
                                <p className="text-slate-600 text-sm mb-6">Age helps determine eligibility for age-bracket specific scholarships or senior benefits.</p>

                                <input
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-lg font-medium"
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">What is your annual household income?</h2>
                                <p className="text-slate-600 text-sm mb-6">Enter your estimated total yearly income in INR to check income ceiling criteria.</p>

                                <input
                                    type="number"
                                    step="10000"
                                    value={formData.annualIncome}
                                    onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-lg font-medium"
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Select your primary occupation</h2>
                                <p className="text-slate-600 text-sm mb-6">This matches you with occupational subsidies like farming equipment grants or student stipends.</p>

                                <div className="grid grid-cols-2 gap-3">
                                    {OCCUPATIONS.map((occ) => (
                                        <button
                                            key={occ}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, occupation: occ })}
                                            className={`p-4 rounded-xl border text-left font-medium transition ${formData.occupation === occ
                                                ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm"
                                                : "border-slate-200 hover:border-slate-300 text-slate-700"
                                                }`}
                                        >
                                            {occ}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Category & Resident State</h2>
                                <p className="text-slate-600 text-sm mb-6">Select your social category and residential region.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Social Category</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, category: cat })}
                                                    className={`p-3 rounded-lg border text-sm font-medium transition ${formData.category === cat
                                                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">State</label>
                                        <select
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800 font-medium"
                                        >
                                            {STATES.map((st) => (
                                                <option key={st} value={st}>{st}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </button>
                    ) : (
                        <div />
                    )}

                    <button
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 flex items-center gap-2"
                    >
                        <span>{step === 4 ? "View Results" : "Next"}</span>
                        {step === 4 ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>

            </div>
        </div>
    );
}