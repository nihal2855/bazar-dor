import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#f4f7f5] py-12">
            <section className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    সব পণ্য
                </h2>

                <div className="skeleton h-4 w-40 mb-6 bg-gray-200"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                            <div className="flex gap-4 items-center mb-6">
                                <div className="skeleton w-[52px] h-[52px] rounded-xl shrink-0"></div>
                                <div className="space-y-2 w-full">
                                    <div className="skeleton h-5 w-3/4"></div>
                                    <div className="skeleton h-3 w-1/2"></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <div className="skeleton h-3 w-16"></div>
                                    <div className="skeleton h-6 w-24"></div>
                                </div>
                                <div className="skeleton h-6 w-14 rounded-md"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}