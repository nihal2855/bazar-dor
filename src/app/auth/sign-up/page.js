"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");
        const confirmPassword = form.get("confirmPassword");

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("দুটি পাসওয়ার্ড মেলেনি");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("অ্যাকাউন্ট তৈরি করা হচ্ছে...");

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                toast.dismiss(loadingToast);
                toast.error(error.message || "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন");
                setLoading(false);
                return;
            }

            toast.dismiss(loadingToast);
            toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
            router.push("/auth/profile");
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setLoading(false);
        }
    }

    async function handleSocial(provider) {
        toast.loading(`${provider} এর মাধ্যমে রিডাইরেক্ট করা হচ্ছে...`, { duration: 2000 });
        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/auth/profile",
            });

            if (error) {
                toast.error(error.message || "সোশ্যাল লগইনে সমস্যা হয়েছে");
            }
        } catch (err) {
            toast.error("নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f5] px-4">

            {/* Toaster কম্পোনেন্টটি যুক্ত করা হয়েছে */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="text-sm text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                            required
                        />
                    </div>

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
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="আবার লিখুন"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white rounded-lg py-2.5 text-sm font-semibold transition duration-200 bg-[#0F8A46] hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="loading loading-spinner loading-sm"></span>
                                অপেক্ষা করুন...
                            </span>
                        ) : "অ্যাকাউন্ট তৈরি করুন"}
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
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocial("github")}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <FaGithub />
                        GitHub
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?
                    <Link href="/auth/sign-in" className="text-[#0F8A46] font-semibold hover:underline ml-1">
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>

            <Link href="/" className="mt-8 text-sm text-gray-500 hover:text-gray-800 transition flex items-center gap-1">
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
}