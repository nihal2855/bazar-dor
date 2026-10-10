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
    const [socialLoading, setSocialLoading] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (loading || socialLoading) return;

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirmPassword")?.toString();

        if (!name || !email || !password || !confirmPassword) {
            toast.error("সবগুলো তথ্য পূরণ করুন।");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("দুটি পাসওয়ার্ড মেলেনি।");
            return;
        }

        setLoading(true);

        const toastId = toast.loading("অ্যাকাউন্ট তৈরি করা হচ্ছে...");

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                toast.error(
                    error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
                    { id: toastId }
                );
                return;
            }

            toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!", {
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
    }

    async function handleSocial(provider) {
        if (loading || socialLoading) return;

        setSocialLoading(provider);

        const providerName =
            provider === "google" ? "Google" : "GitHub";

        const toastId = toast.loading(
            `${providerName} দিয়ে সাইন আপ চালু হচ্ছে...`
        );

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/auth/profile",
            });

            if (error) {
                toast.error(
                    error.message || "সোশ্যাল সাইন আপ করতে সমস্যা হয়েছে।",
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
    }

    const isDisabled = loading || Boolean(socialLoading);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7f5] px-4 py-10">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Page Heading */}
            <header className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mx-auto max-w-md text-sm leading-6 text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </header>

            {/* Sign Up Card */}
            <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="যেমন: রহিম উদ্দিন"
                            autoComplete="name"
                            required
                            disabled={isDisabled}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />
                    </div>

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
                            disabled={isDisabled}
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
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            disabled={isDisabled}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="আবার পাসওয়ার্ড লিখুন"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            disabled={isDisabled}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className="flex w-full items-center justify-center rounded-lg bg-[#0F8A46] py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="loading loading-spinner loading-sm" />
                                অপেক্ষা করুন...
                            </span>
                        ) : (
                            "অ্যাকাউন্ট তৈরি করুন"
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

                {/* Social Sign Up */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => handleSocial("google")}
                        disabled={isDisabled}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FaGoogle className="text-red-500" />

                        {socialLoading === "google"
                            ? "অপেক্ষা করুন..."
                            : "Google"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocial("github")}
                        disabled={isDisabled}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FaGithub />

                        {socialLoading === "github"
                            ? "অপেক্ষা করুন..."
                            : "GitHub"}
                    </button>
                </div>

                {/* Sign In Link */}
                <p className="mt-8 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?

                    <Link
                        href="/auth/sign-in"
                        className="ml-1 font-semibold text-[#0F8A46] hover:underline"
                    >
                        সাইন ইন করুন
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