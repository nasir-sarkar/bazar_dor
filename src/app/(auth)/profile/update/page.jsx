"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, Skeleton, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";



export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    setIsLoading(true);

    const { error } = await updateUser({
      name: userData.name,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };



  
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">তথ্য আপডেট করুন</h2>
        <p className="text-sm">আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        {isPending ? (
          <Skeleton className="h-[121px] w-full rounded-lg" />
        ) : (
          <Form className="flex w-full flex-col gap-4" onSubmit={handleUpdateUser}>
            <TextField
              isRequired
              className="w-full"
              name="name"
              defaultValue={session?.user?.name ?? ""}
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                }
                return null;
              }}
            >
              <Label>নাম</Label>
              <Input placeholder="আপনার নাম" />
              <FieldError />
            </TextField>

            <Button type="submit" fullWidth className="font-semibold" isDisabled={isLoading}>
              {isLoading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
            </Button>
          </Form>
        )}
      </div>

      <Link href="/profile" className="text-sm hover:text-accent">← প্রোফাইলে ফিরে যান</Link>
    </div>
  );
}