"use client";
import { signUp } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordField from "../../components/PasswordField";
import SocialButtons from "../../components/SocialButtons";



const SignUpPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        

        setErrorMessage("");

        if (data.password !== data.confirmPassword) {
            const message = "পাসওয়ার্ড দুটি মিলছে না";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        setIsLoading(true);

        const {error} = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password
        });

        setIsLoading(false);

        if (error) {
            const message = error.message || "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
        router.push("/signin");
    };


    

    return (
        <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-10">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>
                <p className="text-sm">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
                <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>


                    <TextField
                        isRequired
                        className="w-full"
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                            }
                            return null;
                        }}
                    >
                        <Label>নাম</Label>
                        <Input placeholder="যেমন: রহিম উদ্দিন" />
                        <FieldError />
                    </TextField>
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
                        description="কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের ইংরেজি অক্ষর ও ১টি সংখ্যা থাকতে হবে"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে";
                            }
                            return null;
                        }}
                    />


                    <PasswordField
                        name="confirmPassword"
                        label="পাসওয়ার্ড নিশ্চিত করুন"
                        placeholder="আবার লিখুন"
                    />

                    {errorMessage && (
                        <p role="alert" className="text-sm text-danger">{errorMessage}</p>
                    )}

                    <Button type="submit" fullWidth className="font-semibold" isDisabled={isLoading}>
                        {isLoading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </Button>
                </Form>

                <div className="my-4 flex items-center gap-3 text-xs">
                    <span className="h-px flex-1 bg-border" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <SocialButtons />

                <p className="mt-5 text-center text-sm">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link className="font-semibold text-accent underline" href="/signin">সাইন ইন করুন</Link>
                </p>
            </div>

            <Link href="/" className="text-sm hover:text-accent">← হোম পেজে ফিরে যান</Link>
        </div>
    );
};

export default SignUpPage;