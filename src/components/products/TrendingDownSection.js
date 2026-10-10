import Link from 'next/link';
import React, { Suspense } from 'react';

const engToBng = (number) => {
    const bngNumbers = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    return String(number).replace(/[0-9]/g, (digit) => bngNumbers[digit]);
};

const getUnitNameBn = (unit) => {
    const units = {
        'kg': 'কেজি',
        'gm': 'গ্রাম',
        'liter': 'লিটার',
        'dozen': 'ডজন',
        'hali': 'হালি',
        'piece': 'পিস'
    };
    return units[unit?.toLowerCase()] || unit;
};

const ProductsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* এখানে ৩ এর জায়গায় ৬ করা হয়েছে যাতে লোডিং এর সময় ৬টি বক্স দেখায় */}
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex gap-4 items-center mb-6">
                        <div className="skeleton w-[52px] h-[52px] rounded-xl shrink-0"></div>

                        {/* Title & Unit Skeleton */}
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
    );
};

async function PriceDecreasedProducts() {
    const response = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
        cache: 'no-store'
    });

    if (!response.ok) {
        return <div className="text-red-500 py-4">ডেটা লোড করতে সমস্যা হয়েছে!</div>;
    }

    const data = await response.json();
    const allProducts = Array.isArray(data) ? data : (data?.data || []);

    const products = allProducts
        .filter(product => product.change?.dir === 'down')
        .slice(0, 6);

    if (products.length === 0) {
        return <div className="text-gray-500 py-4">বর্তমানে কোনো পণ্যের দাম কমেনি।</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-4 items-center mb-6">
                        <div className="w-[52px] h-[52px] bg-[#f4f7f5] rounded-xl flex items-center justify-center text-2xl shrink-0">
                            {product.image}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                {product.nameBn}
                            </h3>
                            <p className="text-gray-500 text-sm mt-0.5">
                                প্রতি {getUnitNameBn(product.unit)}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">
                                আজকের দাম
                            </p>
                            <p className="font-extrabold text-xl text-gray-900">
                                {engToBng(product.today)} টাকা
                            </p>
                        </div>

                        <div className="bg-[#E8F5ED] text-[#0F8A46] px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                            <span className="text-[10px]">▼</span> {engToBng(product.change.pct)}%
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

const TrendingDownSection = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 my-6">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[#0F8A46] text-sm">▼</span>
                <h2 className="text-xl font-bold text-gray-900">
                    আজ দাম কমেছে
                </h2>
            </div>

            <Suspense fallback={<ProductsSkeleton />}>
                <PriceDecreasedProducts />
            </Suspense>
        </section>
    );
};

export default TrendingDownSection;