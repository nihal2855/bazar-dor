import React, { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Image from "next/image";
import Logo_img from "@/assets/logo-icon.png";
import NavAuth from "./NavAuth";

async function CurrentDate() {
    await connection();

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(today);

    return <>{formattedDate}</>;
}

const Navbar = () => {
    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <nav className="container mx-auto px-4 sm:px-6">
                <div className="flex min-h-[68px] items-center justify-between gap-4">

                    <Link href="/" className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                            <Image src={Logo_img} alt="Bazar Dor" />
                        </div>

                        <div className="min-w-0">
                            <h1 className="truncate text-[20px] font-bold leading-5 text-gray-800">
                                বাজার দর
                            </h1>

                            <p className="mt-1 truncate text-[10px] leading-3 text-gray-500 sm:text-[11px]">
                                <Suspense fallback={<span>...</span>}>
                                    <CurrentDate />
                                </Suspense>
                            </p>
                        </div>
                    </Link>

                    <NavAuth />

                </div>
            </nav>
        </div>
    );
};

export default Navbar;