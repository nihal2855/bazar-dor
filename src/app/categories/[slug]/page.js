"use client";

import Link from 'next/link';
import React, { useState, useEffect, use } from 'react';

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

const Page = ({ params }) => {
    // Next.js 15 অনুযায়ী React.use() দিয়ে params আনর‍্যাপ করা হলো
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('default');
    const [isLoading, setIsLoading] = useState(true); // লোডিং স্টেট যুক্ত করা হলো

    useEffect(() => {
        if (!slug) return;

        setIsLoading(true); // ফেচ শুরুর আগে লোডিং ট্রু করা হলো
        fetch('https://api.abcz.workers.dev/api/bazardor/products')
            .then((res) => res.json())
            .then((data) => {
                const allProducts = Array.isArray(data) ? data : (data?.data || []);
                const filtered = allProducts.filter(product => product.category === slug);
                setProducts(filtered);
                setIsLoading(false); // ডেটা পেলে লোডিং ফলস
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false); // এরর হলেও লোডিং ফলস
            });
    }, [slug]);

    // ১. ডেটা লোড হওয়ার সময় যা দেখাবে
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f4f7f5] py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-gray-500 py-4 text-center">ডেটা লোড হচ্ছে...</div>
                </div>
            </div>
        );
    }

    // ২. ডেটা লোড শেষ কিন্তু কোনো পণ্য পাওয়া যায়নি
    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-[#f4f7f5] py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-gray-500 py-4 text-center">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</div>
                </div>
            </div>
        );
    }

    const categoryName = products[0]?.categoryNameBn || 'পণ্যসমূহ';
    const categoryIcon = products[0]?.categoryIcon || '📦';
    const totalCount = products.length;

    const sortedProducts = [...products];
    if (sortOrder === 'asc') {
        sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sortOrder === 'desc') {
        sortedProducts.sort((a, b) => b.today - a.today);
    }

    return (
        <div className="min-h-screen bg-[#f4f7f5] py-8">
            <section className="container mx-auto px-4 sm:px-6">

                <div className="bg-white rounded-[16px] border border-gray-200 p-6 mb-6 flex items-center gap-5 shadow-sm">
                    <div className="w-16 h-16 bg-[#f4f7f5] rounded-full flex items-center justify-center text-4xl shrink-0">
                        {categoryIcon}
                    </div>
                    <div>
                        <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
                            {categoryName}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {engToBng(totalCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[12px] border border-gray-200 p-4 mb-8 flex justify-end items-center gap-3 shadow-sm">
                    <span className="text-gray-600 text-sm font-medium">সাজান</span>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="asc">দাম: কম থেকে বেশি</option>
                        <option value="desc">দাম: বেশি থেকে কম</option>
                    </select>
                </div>

                <p className="text-gray-500 text-sm mb-4">
                    মোট {engToBng(totalCount)}টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sortedProducts.map((product) => (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product.id}
                            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow block cursor-pointer"
                        >
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
            </section>
        </div>
    );
};

export default Page;