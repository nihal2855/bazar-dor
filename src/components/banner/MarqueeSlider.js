import Link from 'next/link';
import React, { Suspense } from 'react';
import { connection } from 'next/server';

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

async function TickerContent() {
    await connection();

    const response = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
        cache: 'no-store'
    });

    let products = [];

    if (response.ok) {
        const data = await response.json();
        products = Array.isArray(data) ? data : (data?.data || []);
    }

    const tickerItems = [...products, ...products];

    return (
        <div className="flex w-max animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
            {tickerItems.map((product, index) => (
                <Link href={`/products/${product.slug}`} key={`${product.id}-${index}`} className="flex items-center gap-2 px-6 border-r border-base-200 whitespace-nowrap">
                    <span className="text-lg">{product.image}</span>
                    <span className="font-medium text-base-content">
                        {product.nameBn}
                    </span>
                    <span className="text-base-content/70">
                        {engToBng(product.today)} টাকা/{getUnitNameBn(product.unit)}
                    </span>

                    {product.change?.dir === 'up' && (
                        <span className="text-error font-bold text-sm flex items-center gap-0.5">
                            ▲ {engToBng(product.change.pct)}%
                        </span>
                    )}
                    {product.change?.dir === 'down' && (
                        <span className="text-success font-bold text-sm flex items-center gap-0.5">
                            ▼ {engToBng(product.change.pct)}%
                        </span>
                    )}
                    {(!product.change?.dir || product.change?.dir === 'none') && (
                        <span className="text-base-content/50 font-bold text-sm flex items-center gap-0.5">
                            — {engToBng(product.change?.pct || 0)}%
                        </span>
                    )}
                </Link>
            ))}
        </div>
    );
}

const MarqueeSlider = () => {
    return (
        <div className="w-full bg-base-100 border-y border-base-200 overflow-hidden py-3 relative flex">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}} />

            <Suspense fallback={<div className="px-4 py-2 text-base-content/50 text-sm">ডেটা লোড হচ্ছে...</div>}>
                <TickerContent />
            </Suspense>
        </div>
    );
};

export default MarqueeSlider;