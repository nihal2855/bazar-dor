import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-6 mt-auto">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
                    <p>
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                    <p>
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;