"use client";

import { signIn } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import PasswordField from "../../components/PasswordField";
import SocialButtons from "../../components/SocialButtons";
import ProtectedToast from "./ProtectedToast";



const SignInPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setIsLoading(true);
        setErrorMessage("");

        const { error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
        })

        setIsLoading(false);

        if (error) {
            const message = error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        toast.success("সফলভাবে সাইন ইন হয়েছে");
        router.push("/");
        router.refresh();
    };




    return (
        <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-10">
            <Suspense fallback={null}>
                <ProtectedToast />
            </Suspense>

            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">সাইন ইন</h2>
                <p className="text-sm">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>


            <div className="rounded-2xl border border-border bg-surface p-6">
                <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        className="w-full"
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "সঠিক ইমেইল ঠিকানা দিন";
                            }
                            return null;
                        }}
                    >
                        <Label>ইমেইল</Label>
                        <Input placeholder="you@example.com" />
                        <FieldError />
                    </TextField>

                    <PasswordField
                        label="পাসওয়ার্ড"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                            }
                            return null;
                        }}
                    />

                    {errorMessage && (
                        <p role="alert" className="text-sm text-danger">{errorMessage}</p>
                    )}

                    <Button type="submit" fullWidth className="font-semibold" isDisabled={isLoading}>
                        {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                    </Button>
                </Form>


                <div className="my-4 flex items-center gap-3 text-xs">
                    <span className="h-px flex-1 bg-border" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <SocialButtons />


                <p className="mt-5 text-center text-sm">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link className="font-semibold text-accent underline" href="/signup">সাইন আপ করুন</Link>
                </p>
            </div>

            <Link href="/" className="text-sm hover:text-accent">← হোম পেজে ফিরে যান</Link>
        </div>
    );
};

export default SignInPage;