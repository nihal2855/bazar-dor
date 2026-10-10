"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { ChevronDown, User, LogOut } from 'lucide-react';

export default function NavAuth() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    if (isPending) {
        return <div className="h-10 w-24 animate-pulse bg-gray-100 rounded-lg"></div>;
    }

    // ইউজার লগিন না থাকলে সাইন ইন / সাইন আপ বাটন দেখাবে
    if (!session) {
        return (
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                <Link href="/auth/sign-in" className="whitespace-nowrap text-sm font-semibold text-gray-800 transition hover:text-green-600 sm:text-[15px]">
                    সাইন ইন
                </Link>
                <Link href="/auth/sign-up" className="btn min-h-10 h-10 flex items-center rounded-lg border-0 bg-green-600 px-4 text-sm font-semibold text-white shadow-md hover:bg-green-700 sm:px-5">
                    সাইন আপ
                </Link>
            </div>
        );
    }

    // নামের প্রথম অংশ বের করার জন্য (যেমন: "Rezwan Ahmed" থেকে "Rezwan")
    const firstName = session.user.name ? session.user.name.split(' ')[0] : 'User';

    return (
        <div className="relative group">
            {/* ১ম ছবির মত ড্রপডাউন ট্রিগার */}
            <div className="flex items-center gap-2.5 cursor-pointer py-2">
                <img
                    src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=f4f7f5&color=0F8A46`}
                    alt="Profile"
                    className="w-[42px] h-[42px] rounded-2xl object-cover bg-gray-100"
                />
                <span className="text-[18px] font-semibold text-gray-800">
                    {firstName}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
            </div>

            {/* ২য় ছবির মত হোভার পপআপ/মেনু */}
            <div className="absolute right-0 top-full w-64 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="mb-5">
                    <h3 className="text-[17px] font-bold text-gray-800 mb-0.5">{session.user.name}</h3>
                    <p className="text-[14px] text-gray-500">{session.user.email}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <Link href="/auth/profile" className="flex items-center gap-3 text-[15px] font-medium text-gray-700 hover:text-green-600 transition">
                        <User size={20} className="text-blue-500/70" />
                        আমার প্রোফাইল
                    </Link>

                    <button
                        onClick={async () => {
                            await signOut();
                            router.push('/auth/sign-in');
                        }}
                        className="flex items-center gap-3 text-[15px] font-medium text-red-500 hover:text-red-600 transition"
                    >
                        <LogOut size={20} className="rotate-180" />
                        সাইন আউট
                    </button>
                </div>
            </div>

            {/* Hover area bridge (যাতে মাউস সরালে মেনু হারিয়ে না যায়) */}
            <div className="absolute top-full right-0 w-full h-4 bg-transparent"></div>
        </div>
    );
}