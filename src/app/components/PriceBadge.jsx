import { formatPercent } from "@/lib/market";

const BADGE_STYLE = {
    up: { symbol: "▲", color: "text-danger" },
    down: { symbol: "▼", color: "text-success" },
    flat: { symbol: "—", color: "text-foreground" },
};



export default function PriceBadge({ change, className = "" }) {
    const style = BADGE_STYLE[change.dir] ?? BADGE_STYLE.flat;

    return (
        <span
            className={`inline-flex h-6 items-center gap-1.5 rounded-full bg-surface-secondary px-2 text-xs ${style.color} ${className}`}
        >
            <span>{style.symbol}</span>
            <span className="font-semibold">{formatPercent(change.pct)}</span>
        </span>
    );
}