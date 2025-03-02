"use client"

import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    let errormsg = error?.message ?? "Någonting gick fel.";
    if (error?.name === "AxiosError")
        errormsg = "Sidan kunde inte hittas.";

    return (
        <main>
            <h1>{errormsg}</h1>
            <button onClick={() => reset()}>Försök igen</button>
            <button onClick={() => router.push('/')}>Hem</button>
        </main>
    );
}