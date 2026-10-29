"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, FileText, ShieldAlert, Sparkles, Filter } from "lucide-react";
import { evaluateEligibility } from "@/lib/eligibilityEngine";
import { Scheme, UserProfile } from "@/lib/types";

function ResultsContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

    // Filter schemes based on selected category tab
    const categories = ["All", "Education", "Agriculture", "Business", "Healthcare"];
    const filteredSchemes = selectedCategory === "All"
        ? matchedSchemes
        : matchedSchemes.filter((s) => s.category === selectedCategory);

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
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Your Eligible Welfare Schemes
                </h1>
                <p className="text-slate-600 mt-1">
                    Found <span className="font-semibold text-emerald-600">{matchedSchemes.length}</span> schemes matching your criteria.
                </p>
            </div>

            {/* Category Filter Tabs */}
            {matchedSchemes.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
                    <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Schemes Grid */}
            {filteredSchemes.length > 0 ? (
                <div className="space-y-6">
                    {filteredSchemes.map((scheme) => (
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
                /* Fallback if category has no matches or zero schemes match */
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">No schemes found in this category</h2>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                        Try selecting a different filter tab or modifying your quiz profile answers.
                    </p>
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-emerald-600 transition"
                    >
                        Show All Schemes
                    </button>
                </div>
            )}
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="text-center py-20 text-slate-500 font-medium">Evaluating your eligibility...</div>}>
            <ResultsContent />
        </Suspense>
    );
}