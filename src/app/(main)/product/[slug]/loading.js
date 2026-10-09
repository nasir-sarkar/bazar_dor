import { Skeleton } from "@heroui/react";

export default function Loading() {
    
    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6">
            <Skeleton className="h-5 w-64 rounded-lg" />
            <Skeleton className="h-[174px] w-full rounded-2xl" />
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Skeleton className="h-[102px] rounded-2xl" />
                    <Skeleton className="h-[102px] rounded-2xl" />
                    <Skeleton className="h-[102px] rounded-2xl" />
                </div>
                <Skeleton className="h-6 w-56 rounded-lg" />
                <Skeleton className="h-[400px] w-full rounded-2xl" />
            </div>
        </div>
    );
    
}