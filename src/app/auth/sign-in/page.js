"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("লগইন করা হচ্ছে...");

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(
                    error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
                    { id: toastId }
                );
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে!", {
                id: toastId,
            });

            router.push("/auth/profile");
            router.refresh();
        } catch {
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
                id: toastId,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSocial = async (provider) => {
        if (loading || socialLoading) return;

        setSocialLoading(provider);

        const toastId = toast.loading(
            `${provider === "google" ? "Google" : "GitHub"} লগইন চালু হচ্ছে...`
        );

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/auth/profile",
            });

            if (error) {
                toast.error(
                    error.message || "সোশ্যাল লগইনে সমস্যা হয়েছে।",
                    { id: toastId }
                );
                setSocialLoading("");
                return;
            }

            toast.dismiss(toastId);
        } catch {
            toast.error("নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
                id: toastId,
            });
            setSocialLoading("");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7f5] px-4 py-10">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Page Heading */}
            <header className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    সাইন ইন
                </h1>

                <p className="mx-auto max-w-md text-sm leading-6 text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
                    অ্যাকাউন্টে ঢুকুন।
                </p>
            </header>

            {/* Sign In Card */}
            <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            disabled={loading || !!socialLoading}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="আপনার পাসওয়ার্ড"
                            autoComplete="current-password"
                            required
                            disabled={loading || !!socialLoading}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !!socialLoading}
                        className="flex w-full items-center justify-center rounded-lg bg-[#0F8A46] py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="loading loading-spinner loading-sm" />
                                অপেক্ষা করুন...
                            </span>
                        ) : (
                            "সাইন ইন"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-200" />

                    <span className="px-4 text-xs font-medium text-gray-500">
                        অথবা
                    </span>

                    <div className="flex-grow border-t border-gray-200" />
                </div>

                {/* Social Login */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => handleSocial("google")}
                        disabled={loading || !!socialLoading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FaGoogle className="text-red-500" />
                        {socialLoading === "google"
                            ? "অপেক্ষা করুন..."
                            : "Google দিয়ে চালিয়ে যান"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocial("github")}
                        disabled={loading || !!socialLoading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FaGithub />
                        {socialLoading === "github"
                            ? "অপেক্ষা করুন..."
                            : "GitHub দিয়ে চালিয়ে যান"}
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?

                    <Link
                        href="/auth/sign-up"
                        className="ml-1 font-semibold text-[#0F8A46] hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </section>

            {/* Home Link */}
            <Link
                href="/"
                className="mt-8 flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-800"
            >
                <span aria-hidden="true">←</span>
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}