"use client";
import { Button } from "@heroui/react";


export default function Error({ reset }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-4 py-20 text-center">
      <p className="text-6xl">⚠️</p>
      <h2 className="text-2xl font-bold">কিছু একটা ভুল হয়েছে</h2>
      <p className="text-sm">দামের তথ্য আনা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
      <Button className="mt-3 font-semibold" onPress={() => reset()}>
        আবার চেষ্টা করুন
      </Button>
    </div>
  );
}