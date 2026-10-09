"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button, Input, Label, Skeleton, TextField, buttonVariants } from "@heroui/react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";



export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
        },
      },
    });
  };



  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">আমার প্রোফাইল</h2>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {isPending ? (
        <>
          <Skeleton className="h-[120px] w-full rounded-2xl" />
          <Skeleton className="h-[251px] w-full rounded-2xl" />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
            <Avatar className="size-20 shrink-0 rounded-2xl">
              <Avatar.Image src={user?.image ?? undefined} alt={user?.name} />
              <Avatar.Fallback className="rounded-2xl bg-accent text-3xl text-accent-foreground">
                {user?.name?.trim().charAt(0).toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xl">{user?.name}</p>
              <p className="truncate text-base opacity-80">{user?.email}</p>
            </div>
            <Button
              variant="outline"
              className="h-10! rounded-lg! border-danger px-[17px]! text-sm font-semibold text-danger!"
              onPress={handleSignOut}
            >
              ↩ সাইন আউট
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold">তথ্য</h3>
            <TextField isReadOnly className="w-full" name="name" value={user?.name ?? ""}>
              <Label>নাম</Label>
              <Input />
            </TextField>
            <Link
              href="/profile/update"
              className={buttonVariants({ variant: "primary", fullWidth: true, className: "font-semibold" })}
            >
              আপডেট
            </Link>
          </div>
        </>
      )}
    </div>
  );
}