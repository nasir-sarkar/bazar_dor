import Link from "next/link";
import PriceBadge from "./PriceBadge";
import { UNIT_BN, toBn } from "@/lib/market";



export default function ProductCard({ product }) {
    return (
        <Link
            href={`/product/${product.slug}`}
            className="block rounded-2xl border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-2xl">
                    {product.image}
                </div>
                <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold leading-6">{product.nameBn}</h3>
                    <p className="text-xs opacity-70">প্রতি {UNIT_BN[product.unit] ?? product.unit}</p>
                </div>
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                    <p className="text-xs opacity-70">আজকের দাম</p>
                    <p className="text-xl font-bold leading-7">
                        {toBn(product.today)} <span className="text-sm font-medium opacity-70">টাকা</span>
                    </p>
                </div>
                <PriceBadge change={product.change} />
            </div>
        </Link>
    );
}