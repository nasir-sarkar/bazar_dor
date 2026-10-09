import { Suspense } from "react";
import Ticker, { TickerSkeleton } from "../components/Ticker";

export default function MainLayout({ children }) {
    return (
        <>
            <Suspense fallback={<TickerSkeleton />}>
                <Ticker />
            </Suspense>
            {children}
        </>
    );
}
