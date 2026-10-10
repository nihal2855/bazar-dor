"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function page() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        setLoading(true);
        const { error } = await authClient.signIn.email({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            return setError(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
        }
        router.push("/auth/profile");
        router.refresh();
    }

    async function handleSocial(provider) {
        setError("");
        await authClient.signIn.social({
            provider,
            callbackURL: "/auth/profile",
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f5] px-4">

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    সাইন ইন
                </h1>
                <p className="text-sm text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="আপনার পাসওয়ার্ড"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white rounded-lg py-2.5 text-sm font-semibold transition duration-200 bg-[#0F8A46] hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="px-4 text-xs text-gray-500 font-medium">
                        অথবা
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocial("google")}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <FaGoogle className="text-red-500" />
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocial("github")}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <FaGithub />
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?
                    <Link href="/auth/sign-up" className="text-[#0F8A46] font-semibold hover:underline ml-1">
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            <Link href="/" className="mt-8 text-sm text-gray-500 hover:text-gray-800 transition flex items-center gap-1">
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
}