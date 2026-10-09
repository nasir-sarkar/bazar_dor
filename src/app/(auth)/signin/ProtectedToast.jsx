"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";


export default function ProtectedToast() {
    const searchParams = useSearchParams();
    const isProtected = searchParams.get("protected");

    useEffect(() => {
        if (isProtected) {
            toast("এই পেজ দেখতে আগে সাইন ইন করুন", { icon: "⚠️" });
        }
    }, [isProtected]);

    return null;
}