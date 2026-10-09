'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Dropdown, Skeleton, buttonVariants } from "@heroui/react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/market";



const CATEGORY_LINKS = [
    { slug: "chal", nameBn: "চাল", icon: "🍚" },
    { slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
    { slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
    { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];



export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = useSession();

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


    
    const handleMenuAction = (key) => {
        if (key === "profile") router.push("/profile");
        if (key === "signout") handleSignOut();
    };

    const user = session?.user;

    const authLinks = isPending ? (
        <Skeleton className="h-10 w-28 rounded-lg" />
    ) : user ? (
        <Dropdown>
            <Dropdown.Trigger className="flex h-10 items-center gap-2 rounded-lg px-2 outline-none transition hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-accent">
                <Avatar size="sm" className="rounded-[10px]">
                    <Avatar.Image src={user.image ?? undefined} alt={user.name} />
                    <Avatar.Fallback className="rounded-[10px] bg-accent text-accent-foreground">
                        {user.name?.trim().charAt(0).toUpperCase() || "U"}
                    </Avatar.Fallback>
                </Avatar>
                <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">{user.name}</span>
                <span className="text-xs">▾</span>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom end" className="w-64 rounded-lg!">
                <div className="border-b border-border px-3 py-2">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs opacity-70">{user.email}</p>
                </div>
                <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item id="profile" textValue="আমার প্রোফাইল">
                        👤 আমার প্রোফাইল
                    </Dropdown.Item>
                    <Dropdown.Item id="signout" textValue="সাইন আউট" className="text-sm text-danger!">
                        ↩ সাইন আউট
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    ) : (
        <div className="flex items-center gap-2">
            <Link
                href="/signin"
                className={buttonVariants({ variant: "ghost", size: "sm", className: "font-semibold sm:h-10 sm:px-4 sm:text-sm" })}
            >
                সাইন ইন
            </Link>
            <Link
                href="/signup"
                className={buttonVariants({ variant: "primary", size: "sm", className: "font-semibold sm:h-10 sm:px-4 sm:text-sm" })}
            >
                সাইন আপ
            </Link>
        </div>
    );




    return (
        <nav className="sticky top-0 z-40 w-full bg-surface">
            <header className="border-b border-border">
                <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-lg text-accent-foreground">
                            🛒
                        </span>
                        <span className="flex flex-col leading-tight">
                            <span className="text-xl font-bold">বাজার দর</span>
                            <span className="text-xs" suppressHydrationWarning>{getBanglaDate()}</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {authLinks}
                    </div>
                </div>
            </header>
            <div className="border-b border-surface-secondary">
                <ul className="mx-auto flex h-12 max-w-6xl items-center gap-2 overflow-x-auto px-4">
                    {CATEGORY_LINKS.map((category) => {
                        const isActive = pathname === `/category/${category.slug}`;
                        return (
                            <li key={category.slug} className="shrink-0">
                                <Link
                                    href={`/category/${category.slug}`}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
                                        isActive
                                            ? "bg-accent text-accent-foreground"
                                            : "hover:bg-surface-secondary"
                                    }`}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.nameBn}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}