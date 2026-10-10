"use client";

import React, { useEffect, useState } from 'react';
import BazarHero from "@/assets/bazar-hero.png";
import Image from 'next/image';
import Link from 'next/link';

function DynamicDateBadge() {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const today = new Date();

        const date = new Intl.DateTimeFormat('bn-BD', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(today);

        setFormattedDate(date);
    }, []);

    return <>{formattedDate || '...'}</>;
}

const Banner = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 my-8">
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">

                <div className="flex-1 space-y-6 text-center md:text-left">

                    <div className="inline-flex items-center rounded-full bg-[#E8F5ED] px-4 py-1.5 text-sm font-semibold text-[#0F8A46]">
                        <DynamicDateBadge />
                    </div>

                    <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h2>

                    <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <div>
                        <Link
                            href="/products"
                            className="bg-[#0F8A46] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-sm"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>

                </div>

                <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                    <Image
                        src={BazarHero}
                        alt="Market Produce"
                        className="w-56 md:w-72 object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;