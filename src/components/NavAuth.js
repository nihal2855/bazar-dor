"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { ChevronDown, User, LogOut } from 'lucide-react';
import toast from "react-hot-toast";

export default function NavAuth() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    if (isPending) {
        return <div className="skeleton h-10 w-24 rounded-lg"></div>;
    }

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

    const firstName = session.user.name ? session.user.name.split(' ')[0] : 'User';

    const handleSignOut = async () => {
        setIsSigningOut(true);
        const loadingToast = toast.loading("সাইন আউট করা হচ্ছে...");

        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.dismiss(loadingToast);
                        toast.success("সফলভাবে সাইন আউট হয়েছেন!");
                        router.push('/auth/sign-in');
                        router.refresh();
                    },
                    onError: (error) => {
                        toast.dismiss(loadingToast);
                        toast.error(error.error?.message || "সাইন আউট করতে সমস্যা হয়েছে।");
                        setIsSigningOut(false);
                    }
                }
            });
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("সার্ভারে সমস্যা হয়েছে!");
            setIsSigningOut(false);
        }
    };

    return (
        <div className="relative group">
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
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="flex items-center gap-3 text-[15px] font-medium text-red-500 hover:text-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSigningOut ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <LogOut size={20} className="rotate-180" />
                        )}
                        {isSigningOut ? "হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>
            </div>

            <div className="absolute top-full right-0 w-full h-4 bg-transparent"></div>
        </div>
    );
}