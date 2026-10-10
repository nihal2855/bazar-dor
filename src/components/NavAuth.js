"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { ChevronDown, UserRound, LogOut, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function NavAuth() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") setIsMenuOpen(false);
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    /* ---------- Loading ---------- */
    if (isPending) {
        return (
            <div
                className="flex shrink-0 items-center gap-2.5"
                aria-label="অ্যাকাউন্ট লোড হচ্ছে"
            >
                <div className="skeleton h-10 w-10 rounded-full" />
                <div className="skeleton hidden h-4 w-20 rounded-md sm:block" />
            </div>
        );
    }

    /* ---------- Logged out ---------- */
    if (!session?.user) {
        return (
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <Link
                    href="/auth/sign-in"
                    className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700 sm:text-[15px]"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/auth/sign-up"
                    className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-green-600 px-5 text-sm font-semibold text-white shadow-sm shadow-green-600/30 transition hover:bg-green-700 hover:shadow-md active:scale-[0.97] sm:text-[15px]"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    /* ---------- Logged in ---------- */
    const user = session.user;
    const fullName = user.name?.trim() || "User";
    const firstName = fullName.split(/\s+/)[0];

    const avatarUrl =
        user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            fullName
        )}&background=dcfce7&color=15803d&bold=true`;

    async function handleSignOut() {
        if (isSigningOut) return;

        setIsSigningOut(true);
        setIsMenuOpen(false);

        const toastId = toast.loading("সাইন আউট করা হচ্ছে...");

        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("সফলভাবে সাইন আউট হয়েছেন!", { id: toastId });
                        router.push("/auth/sign-in");
                        router.refresh();
                    },
                    onError: (error) => {
                        toast.error(
                            error.error?.message || "সাইন আউট করতে সমস্যা হয়েছে।",
                            { id: toastId }
                        );
                        setIsSigningOut(false);
                    },
                },
            });
        } catch {
            toast.error("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
                id: toastId,
            });
            setIsSigningOut(false);
        }
    }

    return (
        <div ref={menuRef} className="relative shrink-0">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
                aria-label="ইউজার মেনু"
                className={`group flex cursor-pointer items-center gap-2 rounded-full border bg-white py-1 pl-1 pr-2.5 outline-none transition focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:pr-3 ${isMenuOpen
                        ? "border-green-200 shadow-sm"
                        : "border-gray-200 hover:border-green-200 hover:shadow-sm"
                    }`}
            >
                <img
                    src={avatarUrl}
                    alt={`${firstName} এর প্রোফাইল`}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 shrink-0 rounded-full bg-green-50 object-cover ring-2 ring-white"
                />

                <span className="hidden max-w-[110px] truncate text-sm font-semibold text-gray-800 sm:block sm:max-w-[140px] sm:text-[15px]">
                    {firstName}
                </span>

                <ChevronDown
                    size={16}
                    className={`shrink-0 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${isMenuOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            <div
                role="menu"
                aria-hidden={!isMenuOpen}
                className={`absolute right-0 top-full z-50 mt-3 w-[min(17rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-200 ${isMenuOpen
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none invisible -translate-y-1 scale-95 opacity-0"
                    }`}
            >
                {/* User info */}
                <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-br from-green-50 to-white p-4">
                    <img
                        src={avatarUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 shrink-0 rounded-full bg-green-50 object-cover ring-2 ring-white"
                    />

                    <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-bold text-gray-900">
                            {fullName}
                        </h3>
                        <p className="truncate text-xs text-gray-500">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Items */}
                <div className="flex flex-col p-2">
                    <Link
                        href="/auth/profile"
                        role="menuitem"
                        tabIndex={isMenuOpen ? 0 : -1}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-green-100 group-hover:text-green-700">
                            <UserRound size={18} />
                        </span>

                        <span className="flex-1">আমার প্রোফাইল</span>

                        <ChevronRight
                            size={16}
                            className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-green-600"
                        />
                    </Link>

                    <div className="my-1 h-px bg-gray-100" />

                    <button
                        type="button"
                        role="menuitem"
                        tabIndex={isMenuOpen ? 0 : -1}
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition group-hover:bg-red-100">
                            {isSigningOut ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <LogOut size={18} className="rotate-180" />
                            )}
                        </span>

                        {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>
            </div>
        </div>
    );
}