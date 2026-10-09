import { Skeleton } from "@heroui/react";
import { ProductGridSkeleton } from "../../../components/ProductGrid";


export default function Loading() {
    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
            <Skeleton className="h-12 w-48 rounded-xl" />
            <Skeleton className="h-[66px] w-full rounded-2xl" />
            <Skeleton className="h-5 w-56 rounded-lg" />
            <ProductGridSkeleton count={6} />
        </div>
    );
}