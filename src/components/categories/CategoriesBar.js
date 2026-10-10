import Link from 'next/link';
import React, { Suspense } from 'react';

const CategoriesSkeleton = () => {
    return (
        <div className="w-full border-b border-gray-100 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-6 py-3 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-2 shrink-0"
                        >
                            <div className="skeleton w-5 h-5 rounded-full"></div>
                            <div className="skeleton h-4 w-16"></div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

const CategoriesContent = async () => {
    const response = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/categories',
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    let categories = [];

    if (response.ok) {
        const data = await response.json();
        categories = Array.isArray(data) ? data : (data?.data || []);
    }

    return (
        <div className="w-full border-b border-gray-100 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-6 py-3 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Link href={`/categories/${category.slug}`}
                                key={category.id}
                                className="flex items-center gap-2 shrink-0 text-[15px] font-medium text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
                            >
                                {category.icon && (
                                    <span className="text-lg">
                                        {category.icon}
                                    </span>
                                )}

                                <span>{category.nameBn}</span>
                            </Link>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500 py-2">
                            কোনো ক্যাটাগরি পাওয়া যায়নি
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

const CategoriesBar = () => {
    return (
        <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesContent />
        </Suspense>
    );
};

export default CategoriesBar;