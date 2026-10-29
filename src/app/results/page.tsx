"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, FileText, ShieldAlert, Sparkles } from "lucide-react";
import { evaluateEligibility } from "@/lib/eligibilityEngine";
import { Scheme, UserProfile } from "@/lib/types";

function ResultsContent() {
    const searchParams = useSearchParams();

    // Extract query parameters from URL
    const age = Number(searchParams.get("age") || 22);
    const annualIncome = Number(searchParams.get("income") || 150000);
    const occupation = searchParams.get("occupation") || "Student";
    const category = searchParams.get("category") || "General";
    const state = searchParams.get("state") || "Gujarat";

    const userProfile: UserProfile = {
        age,
        annualIncome,
        occupation,
        category,
        state,
    };

    // Run eligibility engine
    const matchedSchemes: Scheme[] = evaluateEligibility(userProfile);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Top Navigation / Back */}
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retake Quiz</span>
                </Link>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Profile: {age} yrs • {occupation} • ₹{annualIncome.toLocaleString("en-IN")}
                </span>
            </div>

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Your Eligible Welfare Schemes
                </h1>
                <p className="text-slate-600 mt-1">
                    Found <span className="font-semibold text-emerald-600">{matchedSchemes.length}</span> schemes matching your criteria.
                </p>
            </div>

            {/* Schemes Grid */}
            {matchedSchemes.length > 0 ? (
                <div className="space-y-6">
                    {matchedSchemes.map((scheme) => (
                        <div
                            key={scheme.id}
                            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                                        {scheme.category}
                                    </span>
                                    <h2 className="text-xl font-bold text-slate-900 mt-2">{scheme.title}</h2>
                                </div>
                                <a
                                    href={scheme.official_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-emerald-600 transition self-start sm:self-auto"
                                >
                                    <span>Official Portal</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{scheme.description}</p>

                            {/* Document Checklist Box */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="flex items-center gap-2 font-semibold text-xs text-slate-700 uppercase tracking-wider mb-3">
                                    <FileText className="w-4 h-4 text-emerald-600" />
                                    <span>Required Document Checklist:</span>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {scheme.required_documents.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Fallback if zero schemes match */
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">No direct schemes found for this profile</h2>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                        Try adjusting your annual income or occupation criteria in the quiz to explore other regional grants and subsidies.
                    </p>
                    <Link
                        href="/quiz"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
                    >
                        <span>Modify Quiz Answers</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

// Wrapped in Suspense because of useSearchParams in Next.js App Router
export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 text-slate-500 font-medium">Evaluating your eligibility...</div>}>
            <ResultsContent />
        </Suspense>
    );
}