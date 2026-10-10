"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut, updateUser } from '@/lib/auth-client';
import { FiLogOut } from 'react-icons/fi';

export default function page() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [name, setName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    useEffect(() => {
        if (!isPending && !session) {
            router.push('/auth/sign-in');
        }
    }, [isPending, session, router]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f4f7f5]">
                <div className="text-gray-500 font-medium text-sm">লোড হচ্ছে...</div>
            </div>
        );
    }

    if (!session) return null;

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/auth/sign-in');
                    router.refresh();
                },
            },
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setMessage({ text: '', type: '' });

        try {
            const { error } = await updateUser({ name: name.trim() });

            if (error) {
                setMessage({ text: error.message || 'আপডেট করতে সমস্যা হয়েছে।', type: 'error' });
            } else {
                setMessage({ text: 'নাম সফলভাবে আপডেট হয়েছে!', type: 'success' });
            }
        } catch (err) {
            setMessage({ text: 'সার্ভারে সমস্যা হয়েছে!', type: 'error' });
        } finally {
            setIsUpdating(false);
            setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f7f5] py-12 px-4 flex flex-col items-center">
            <div className="w-full max-w-3xl">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <img
                            src={
                                session.user.image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name)}&background=f4f7f5&color=0F8A46&size=128`
                            }
                            alt="Profile"
                            className="w-20 h-20 rounded-2xl object-cover bg-gray-50"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                {session.user.name}
                            </h2>
                            <p className="text-base text-gray-500">
                                {session.user.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 border border-red-400 text-red-500 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-50 transition"
                    >
                        <FiLogOut className="text-lg rotate-180" />
                        সাইন আউট
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>

                    {message.text && (
                        <div className={`mb-4 p-3 text-sm rounded-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                নাম
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating || !name.trim()}
                            className={`w-full text-white rounded-lg py-3 text-sm font-semibold transition duration-200 ${isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-[#0F8A46] hover:bg-green-700 disabled:opacity-60"}`}
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}