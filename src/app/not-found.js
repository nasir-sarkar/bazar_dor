import Link from "next/link";
import { buttonVariants } from "@heroui/react";


export const metadata = {
  title: "পেজ পাওয়া যায়নি",
};



export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-4 py-20 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="text-5xl font-bold text-accent">৪০৪</h1>
      <h2 className="text-2xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-sm">
        আপনি যে পেজ বা পণ্যটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা ঠিকানাটি ভুল।
      </p>
      <Link href="/" className={buttonVariants({ variant: "primary", className: "mt-3 font-semibold" })}>
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}