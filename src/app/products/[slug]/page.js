import React from 'react';
import Link from 'next/link';

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

const Page = async ({ params }) => {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    let product = null;

    const response = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
        cache: 'no-store'
    });

    if (response.ok) {
        const data = await response.json();
        const allProducts = Array.isArray(data) ? data : (data?.data || []);
        product = allProducts.find((p) => p.slug === slug);
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#f4f7f5] py-12">
                <div className="container mx-auto px-4 text-center text-gray-500">পণ্যটি পাওয়া যায়নি।</div>
            </div>
        );
    }

    const priceDiff = product.today - (product.yesterday || product.today);
    const isUp = priceDiff > 0;
    const isDown = priceDiff < 0;
    const absDiff = Math.abs(priceDiff);

    let globalMin = product.today;
    let globalMax = product.today;

    if (product.markets && product.markets.length > 0) {
        globalMin = Math.min(...product.markets.map(m => m.min));
        globalMax = Math.max(...product.markets.map(m => m.max));
    }

    return (
        <div className="min-h-screen bg-[#f4f7f5] py-8">
            <section className="container mx-auto px-4 sm:px-6 ">
                <nav className="text-sm text-gray-500 mb-6 flex gap-2 items-center">
                    <Link href="/" className="hover:text-gray-900">হোম</Link>
                    <span>›</span>
                    <Link href={`/categories/${product.category}`} className="hover:text-gray-900">{product.categoryNameBn}</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">{product.nameBn}</span>
                </nav>

                <div className="bg-white rounded-[16px] border border-gray-100 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-[#f4f7f5] rounded-2xl flex items-center justify-center text-4xl shrink-0">
                            {product.image}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                                {product.nameBn}
                            </h1>
                            <p className="text-gray-500 text-sm mb-2">
                                প্রতি {getUnitNameBn(product.unit)} - {product.categoryNameBn}
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                                গতকালের তুলনায় আজ দাম {isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'অপরিবর্তিত'} {absDiff > 0 && `- ${engToBng(absDiff)} টাকা`}
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#f8faf9] border border-gray-100 rounded-xl p-4 text-center min-w-[140px]">
                        <p className="text-gray-500 text-xs mb-1">আজকের দাম</p>
                        <p className="text-3xl font-extrabold text-gray-900 mb-1">{engToBng(product.today)}</p>
                        <p className="text-gray-500 text-[11px] mb-2">টাকা / {getUnitNameBn(product.unit)}</p>

                        {product.change?.dir === 'up' && (
                            <div className="text-[#D92D20] text-xs font-bold flex items-center justify-center gap-1">
                                <span>▲</span> {engToBng(product.change.pct)}%
                            </div>
                        )}
                        {product.change?.dir === 'down' && (
                            <div className="text-[#0F8A46] text-xs font-bold flex items-center justify-center gap-1">
                                <span>▼</span> {engToBng(product.change.pct)}%
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">দামের সারসংক্ষেপ</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        <div className="border border-gray-100 rounded-xl p-5">
                            <p className="text-gray-500 text-sm mb-2">সর্বনিম্ন দাম</p>
                            <p className="text-2xl font-bold text-[#0F8A46] mb-1">{engToBng(globalMin)} টাকা</p>
                            <p className="text-gray-400 text-xs">সবচেয়ে কম দামের বাজার</p>
                        </div>
                        <div className="border border-gray-100 rounded-xl p-5">
                            <p className="text-gray-500 text-sm mb-2">সর্বোচ্চ দাম</p>
                            <p className="text-2xl font-bold text-[#D92D20] mb-1">{engToBng(globalMax)} টাকা</p>
                            <p className="text-gray-400 text-xs">সবচেয়ে বেশি দামের বাজার</p>
                        </div>
                        <div className="border border-gray-100 rounded-xl p-5">
                            <p className="text-gray-500 text-sm mb-2">গড় দাম</p>
                            <p className="text-2xl font-bold text-[#0F8A46] mb-1">{engToBng(product.today)} টাকা</p>
                            <p className="text-gray-400 text-xs">প্রতি {getUnitNameBn(product.unit)}-এর হিসাবে</p>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-6">বাজারভিত্তিক আজকের দাম</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-4 px-2 text-gray-500 font-medium text-sm">বাজার</th>
                                    <th className="py-4 px-2 text-gray-500 font-medium text-sm">বিভাগ</th>
                                    <th className="py-4 px-2 text-gray-500 font-medium text-sm">সর্বনিম্ন</th>
                                    <th className="py-4 px-2 text-gray-500 font-medium text-sm">সর্বাধিক</th>
                                    <th className="py-4 px-2 text-gray-500 font-medium text-sm">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.markets?.map((market, idx) => {
                                    const avg = Math.round((market.min + market.max) / 2);
                                    return (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-2 text-gray-900 text-sm font-medium">{market.market}</td>
                                            <td className="py-4 px-2 text-gray-600 text-sm">{market.division}</td>
                                            <td className="py-4 px-2 text-gray-600 text-sm">{engToBng(market.min)} টাকা</td>
                                            <td className="py-4 px-2 text-gray-600 text-sm">{engToBng(market.max)} টাকা</td>
                                            <td className="py-4 px-2 text-gray-900 text-sm font-semibold">{engToBng(avg)} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;