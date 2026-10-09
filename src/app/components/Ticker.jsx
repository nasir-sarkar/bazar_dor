import { Skeleton } from "@heroui/react";
import { formatPercent, getProducts, toBn, UNIT_BN } from "@/lib/market";


const CHANGE_STYLE = {
    up: { symbol: "▲", color: "text-danger" },
    down: { symbol: "▼", color: "text-success" },
    flat: { symbol: "—", color: "text-foreground" },
};



function TickerItem({ product }) {
    const style = CHANGE_STYLE[product.change.dir] ?? CHANGE_STYLE.flat;

    return (
        <div className="flex h-9 shrink-0 items-center gap-2 border-r border-surface-secondary px-4 text-sm">
            <span>{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span>{toBn(product.today)} টাকা/{UNIT_BN[product.unit] ?? product.unit}</span>
            <span className={`font-semibold ${style.color}`}>
                {style.symbol} {formatPercent(product.change.pct)}
            </span>
        </div>
    );
}



export default async function Ticker() {
    let products = [];
    try {
        products = await getProducts();
    } catch {
        return null;
    }


    return (
        <div className="overflow-hidden border-b border-border bg-surface" aria-label="আজকের দামের তালিকা">
            <div className="ticker-track">
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                        {products.map((product) => (
                            <TickerItem key={`${copy}-${product.id}`} product={product} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}



export function TickerSkeleton() {
    return (
        <div className="border-b border-border bg-surface">
            <Skeleton className="h-9 w-full rounded-none" />
        </div>
    );
}