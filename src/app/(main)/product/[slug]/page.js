import Link from "next/link";
import { notFound } from "next/navigation";
import PriceBadge from "../../../components/PriceBadge";
import { formatTaka, getPriceSummary, getProductBySlug, toBn, UNIT_BN } from "@/lib/market";



export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    return { title: product ? `${product.nameBn} এর দাম` : "পেজ পাওয়া যায়নি" };
}



function ChangeSentence({ product }) {
    const difference = Math.abs(product.today - product.yesterday);

    if (product.change.dir === "up") {
        return (
            <p className="text-sm">
                গতকালের তুলনায় আজ দাম <span className="font-semibold text-danger">বেড়েছে</span> · {toBn(difference)} টাকা
            </p>
        );
    }
    if (product.change.dir === "down") {
        return (
            <p className="text-sm">
                গতকালের তুলনায় আজ দাম <span className="font-semibold text-success">কমেছে</span> · {toBn(difference)} টাকা
            </p>
        );
    }
    return <p className="text-sm">গতকালের তুলনায় আজ দামের কোনো পরিবর্তন নেই</p>;
}


function PriceStat({ label, value, note, color }) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs">{label}</p>
            <p className={`mt-1 text-2xl font-bold ${color}`}>
                {toBn(value)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs opacity-70">{note}</p>
        </div>
    );
}


export default async function ProductDetailsPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const unit = UNIT_BN[product.unit] ?? product.unit;
    const summary = getPriceSummary(product.markets);



    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6">
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm">
                    <li>
                        <Link href="/" className="hover:text-accent">হোম</Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-[10px]">❯</span>
                        <Link href={`/category/${product.category}`} className="hover:text-accent">
                            {product.categoryNameBn}
                        </Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-[10px]">❯</span>
                        <span aria-current="page" className="font-medium">{product.nameBn}</span>
                    </li>
                </ol>
            </nav>

            
            <section className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-surface-secondary text-4xl">
                        {product.image}
                    </div>
                    <div className="flex min-w-0 flex-col gap-1.5">
                        <h1 className="text-3xl font-bold leading-9">{product.nameBn}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="rounded-full bg-surface-secondary px-2.5 py-0.5">প্রতি {unit}</span>
                            <Link
                                href={`/category/${product.category}`}
                                className="rounded-full bg-surface-secondary px-2.5 py-0.5 hover:text-accent"
                            >
                                {product.categoryIcon} {product.categoryNameBn}
                            </Link>
                        </div>
                        <ChangeSentence product={product} />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-1 rounded-2xl bg-surface-secondary px-5 py-4 md:items-center md:text-center">
                    <p className="text-sm">আজকের দাম</p>
                    <p className="text-3xl font-bold leading-9">{toBn(product.today)}</p>
                    <p className="text-sm">টাকা / {unit}</p>
                    <PriceBadge change={product.change} className="mt-1 bg-surface" />
                </div>
            </section>

            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-5">
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <PriceStat
                            label="সর্বনিম্ন দাম"
                            value={summary.min}
                            note="সবচেয়ে কম দামের বাজার"
                            color="text-success"
                        />
                        <PriceStat
                            label="সর্বাধিক দাম"
                            value={summary.max}
                            note="সবচেয়ে বেশি দামের বাজার"
                            color="text-danger"
                        />
                        <PriceStat
                            label="গড় দাম"
                            value={summary.avg}
                            note={`প্রতি ${unit}-এর হিসাবে`}
                            color="text-accent"
                        />
                    </div>
                </section>

                
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
                    <div className="overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[640px] border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-foreground/20">
                                    <th className="px-4 py-3 text-left font-bold">বাজার</th>
                                    <th className="px-4 py-3 text-left font-bold">বিভাগ</th>
                                    <th className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
                                    <th className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
                                    <th className="px-4 py-3 text-right font-bold">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.rows.map((row, index) => (
                                    <tr
                                        key={row.market}
                                        className={`border-b border-foreground/10 last:border-b-0 ${index % 2 === 1 ? "bg-surface-secondary" : ""}`}
                                    >
                                        <td className="px-4 py-3 font-medium">{row.market}</td>
                                        <td className="px-4 py-3">{row.division}</td>
                                        <td className="px-4 py-3 text-right">{formatTaka(row.min)}</td>
                                        <td className="px-4 py-3 text-right">{formatTaka(row.max)}</td>
                                        <td className="px-4 py-3 text-right font-semibold">{formatTaka(row.avg)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}