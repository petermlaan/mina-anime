import Link from "next/link";

// Link with no prefetch
export default function LinkNP({ children, href }: Readonly<{ children: React.ReactNode; href: string }>) {
    return (
        <Link prefetch={false} href={href}>
            {children}
        </Link>
    );
}
