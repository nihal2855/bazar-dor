import Link from 'next/link';
import React, { Suspense } from 'react';

const engToBng = (number) => {
    const bngNumbers = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    return String(number).replace(/[0-9]/g, (digit) => bngNumbers[digit] || digit);
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

const ChangeBadge = ({ change }) => {
    if (change?.dir === 'up') {
        return (
            <div className="bg-red-50 text-[#D92D20] px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                <span className="text-[10px]">▲</span> {engToBng(change.pct)}%
            </div>
        );
    } else if (change?.dir === 'down') {
        return (
            <div className="bg-[#E8F5ED] text-[#0F8A46] px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                <span className="text-[10px]">▼</span> {engToBng(change.pct)}%
            </div>
        );
    }

    return (
        <div className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <span>—</span> {engToBng(change?.pct || 0)}%
        </div>
    );
};

async function AllProductsList() {
    const response = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
        cache: 'no-store'
    });

    if (!response.ok) {
        return <p className="text-red-500 py-4">ডেটা লোড করতে সমস্যা হয়েছে!</p>;
    }

    const data = await response.json();
    const products = Array.isArray(data) ? data : (data?.data || []);

    // যদি প্রোডাক্ট না থাকে
    if (products.length === 0) {
        return <p className="text-gray-500 py-4">কোনো পণ্য পাওয়া যায়নি।</p>;
    }

    return (
        <>
            <p className="text-gray-500 text-sm mb-6">
                মোট {engToBng(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
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

                            <ChangeBadge change={product.change} />
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

const AllProductsSection = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 my-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                সব পণ্য
            </h2>

            <Suspense fallback={<div className="text-gray-500 py-4">ডেটা লোড হচ্ছে...</div>}>
                <AllProductsList />
            </Suspense>
        </section>
    );
};

export default AllProductsSection;