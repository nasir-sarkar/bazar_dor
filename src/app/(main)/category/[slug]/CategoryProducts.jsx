"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "@gravity-ui/icons";
import { buttonVariants } from "@heroui/react";
import ProductGrid from "../../../components/ProductGrid";
import { toBn } from "@/lib/market";


const SORT_OPTIONS = [
    { value: "default", label: "ডিফল্ট" },
    { value: "price-asc", label: "দাম: কম থেকে বেশি" },
    { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];


export default function CategoryProducts({ category, products }) {
    const [sortBy, setSortBy] = useState("default");

   
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "price-asc") return a.today - b.today;
        if (sortBy === "price-desc") return b.today - a.today;
        return a.id - b.id;
    });



    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
            <h1 className="flex items-center gap-3 text-2xl font-bold">
                <span className="flex size-12 items-center justify-center rounded-xl bg-surface text-2xl">
                    {category.icon}
                </span>
                {category.nameBn}
            </h1>

            {products.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-16 text-center">
                    <p className="text-5xl">🛒</p>
                    <h2 className="text-xl font-bold">এই বিভাগে কোনো পণ্য নেই</h2>
                    <p className="text-sm">অনুগ্রহ করে অন্য বিভাগ দেখুন।</p>
                    <Link href="/" className={buttonVariants({ variant: "primary", className: "mt-2 font-semibold" })}>
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-end gap-3 rounded-2xl border border-border bg-surface p-4">
                        <label htmlFor="sort" className="text-sm">সাজান</label>
                        <div className="relative">
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="h-8 cursor-pointer appearance-none rounded-lg border border-foreground bg-surface pl-3 pr-8 text-xs outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2" />
                        </div>
                    </div>

                    <p className="text-sm">মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
                    <ProductGrid products={sortedProducts} />
                </>
            )}
        </div>
    );
}