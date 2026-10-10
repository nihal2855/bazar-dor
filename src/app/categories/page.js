import React from 'react';
import Link from 'next/link';

async function CategoriesList() {
    const response = await fetch('https://api.abcz.workers.dev/api/bazardor/categories', {
        cache: 'no-store'
    });

    if (!response.ok) {
        return <div className="text-red-500 py-4">ডেটা লোড করতে সমস্যা হয়েছে!</div>;
    }

    const data = await response.json();
    const categories = Array.isArray(data) ? data : (data?.data || []);

    if (categories.length === 0) {
        return <div className="text-gray-500 py-4">কোনো ক্যাটাগরি পাওয়া যায়নি।</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
                <Link
                    href={`/categories/${category.slug}`}
                    key={category.id}
                    className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
                >
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                        {category.icon}
                    </span>
                    <span className="font-semibold text-gray-800 text-[15px]">
                        {category.nameBn}
                    </span>
                </Link>
            ))}
        </div>
    );
}

const page = () => {
    return (
        <div className="min-h-screen bg-[#f4f7f5] py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    সকল ক্যাটাগরি
                </h2>

                <CategoriesList />
            </div>
        </div>
    );
};

export default page;