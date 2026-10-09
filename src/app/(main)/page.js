import ProductGrid from "../components/ProductGrid";
import Image from "next/image";
import { buttonVariants } from "@heroui/react";
import { getBanglaDate, getProducts, getTopFallers, getTopRisers, toBn } from "@/lib/market";


export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
};


export default async function Home() {
  const products = await getProducts();
  const risers = getTopRisers(products);
  const fallers = getTopFallers(products);



  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      
      
      <section className="flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-border bg-surface px-6 py-8 md:flex-row md:justify-between md:py-6">
        <div className="flex max-w-xl flex-col items-start gap-3">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {getBanglaDate()}
          </span>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-base leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className={buttonVariants({ variant: "primary", className: "mt-3 font-semibold" })}
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="বাজার দর এর banner"
          width={315}
          height={263}
          priority
          className="h-auto w-full max-w-[315px]"
        />
      </section>



      
      <section className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-base text-danger">▲</span>
          আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      

      
      <section className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-base text-success">▼</span>
          আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      
      


      <section id="সব-পণ্য" className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-2 text-sm">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}