"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    console.log("Error page: ", error?.name, error?.message);

    let errormsg = error?.message ?? "Någonting gick fel.";
    if (error?.name === "AxiosError")
        errormsg = "Sidan kunde inte hittas.";

    return (
        <main>
            <h1>{errormsg}</h1>
            <button onClick={() => reset()}>Försök igen</button>
            <button onClick={() => router.push('/')}>Hem</button>
            <Link href="/">Hemlänk</Link>
            <Link href="https://www.svt.se">SVT</Link>
        </main>
    );
}