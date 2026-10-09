"use client";

import { LogoGithub } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";



const ICON_STYLE = { width: 13.4, height: 13.4 };
const BUTTON_CLASS =
    "h-10! md:h-10! rounded-lg! px-2.5! text-sm font-semibold leading-normal text-foreground!";

function GoogleIcon() {
    return (
        <svg style={ICON_STYLE} viewBox="1 1 22 22" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.83z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
    );
}



export default function SocialButtons() {
    const handleSocialSignIn = async (provider) => {
        const { error } = await signIn.social({
            provider,
            callbackURL: "/",
            errorCallbackURL: "/signin",
        });

        if (error) {
            toast.error(error.message || "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
        }
    };


    
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(176px,1fr))] gap-2">
            <Button fullWidth variant="outline" className={BUTTON_CLASS} onPress={() => handleSocialSignIn("google")}>
                <GoogleIcon />
                Google দিয়ে চালিয়ে যান
            </Button>
            <Button fullWidth variant="outline" className={BUTTON_CLASS} onPress={() => handleSocialSignIn("github")}>
                <LogoGithub style={ICON_STYLE} />
                GitHub দিয়ে চালিয়ে যান
            </Button>
        </div>
    );
}