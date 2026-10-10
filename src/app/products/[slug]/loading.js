import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#f4f7f5] py-8">
            <section className="container mx-auto px-4 sm:px-6">

                {/* Breadcrumb Skeleton */}
                <div className="flex gap-2 items-center mb-6">
                    <div className="skeleton h-4 w-12"></div>
                    <div className="skeleton h-4 w-4"></div>
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-4"></div>
                    <div className="skeleton h-4 w-24"></div>
                </div>

                {/* Top Header Card Skeleton */}
                <div className="bg-white rounded-[16px] border border-gray-100 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className="skeleton w-20 h-20 rounded-2xl shrink-0"></div>
                        <div className="flex flex-col gap-3">
                            <div className="skeleton h-7 w-48"></div>
                            <div className="skeleton h-4 w-32"></div>
                            <div className="skeleton h-4 w-56"></div>
                        </div>
                    </div>
                    <div className="skeleton w-[140px] h-[100px] rounded-xl"></div>
                </div>

                {/* Bottom Details Skeleton */}
                <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm">
                    <div className="skeleton h-6 w-40 mb-6"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        <div className="skeleton h-[116px] rounded-xl"></div>
                        <div className="skeleton h-[116px] rounded-xl"></div>
                        <div className="skeleton h-[116px] rounded-xl"></div>
                    </div>

                    <div className="skeleton h-6 w-56 mb-6"></div>

                    {/* Table Skeleton */}
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-12 w-full"></div>
                        <div className="skeleton h-12 w-full"></div>
                        <div className="skeleton h-12 w-full"></div>
                        <div className="skeleton h-12 w-full"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}