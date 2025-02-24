"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Försök igen</button>
            <button onClick={() => router.back()}>Tillbaka</button>
        </main>
    );
}