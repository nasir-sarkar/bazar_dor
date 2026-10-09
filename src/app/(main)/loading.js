import { Skeleton } from "@heroui/react";
import { ProductGridSkeleton } from "../components/ProductGrid";


export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Skeleton className="h-[283px] w-full rounded-3xl" />
      <section className="flex flex-col gap-3">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <ProductGridSkeleton count={6} />
      </section>
      <section className="flex flex-col gap-3">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <ProductGridSkeleton count={6} />
      </section>
      <section className="flex flex-col gap-3">
        <Skeleton className="h-7 w-32 rounded-lg" />
        <ProductGridSkeleton count={9} />
      </section>
    </div>
  );
}
