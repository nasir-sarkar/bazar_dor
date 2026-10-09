import { Skeleton } from "@heroui/react";
import ProductCard from "./ProductCard";


const GRID_CLASS = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function ProductGrid({ products }) {
    return (
        <div className={GRID_CLASS}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}



export function ProductGridSkeleton({ count = 6 }) {
    return (
        <div className={GRID_CLASS} aria-busy="true" aria-label="লোড হচ্ছে...">
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton key={index} className="h-[138px] rounded-2xl" />
            ))}
        </div>
    );
}