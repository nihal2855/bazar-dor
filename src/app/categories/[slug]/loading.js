export default function Loading() {
    return (
        <div className="min-h-screen bg-[#f4f7f5] py-8">
            <section className="container mx-auto px-4 sm:px-6">

                <div className="bg-white rounded-[16px] border border-gray-200 p-6 mb-6 flex items-center gap-5 shadow-sm">
                    <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-2.5 w-full max-w-xs">
                        <div className="skeleton h-6 w-3/4"></div>
                        <div className="skeleton h-4 w-1/2"></div>
                    </div>
                </div>

                <div className="bg-white rounded-[12px] border border-gray-200 p-4 mb-8 flex justify-end items-center gap-3 shadow-sm">
                    <div className="skeleton h-4 w-12"></div>
                    <div className="skeleton h-9 w-36 rounded-md"></div>
                </div>

                <div className="skeleton h-4 w-40 mb-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex gap-4 items-center mb-6">
                                <div className="skeleton w-[52px] h-[52px] rounded-xl shrink-0"></div>
                                <div className="flex flex-col gap-2.5 w-full">
                                    <div className="skeleton h-5 w-4/5"></div>
                                    <div className="skeleton h-3 w-1/2"></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-2">
                                    <div className="skeleton h-3 w-16"></div>
                                    <div className="skeleton h-6 w-24"></div>
                                </div>
                                <div className="skeleton h-6 w-16 rounded-md"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </div>
    );
}