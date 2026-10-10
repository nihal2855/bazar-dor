import React from 'react';

export default function Loading() {
    const skeletons = Array(12).fill(null);

    return (
        <div className="min-h-screen bg-[#f4f7f5] py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    সকল ক্যাটাগরি
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {skeletons.map((_, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm"
                        >
                            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>

                            <div className="skeleton h-4 w-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}