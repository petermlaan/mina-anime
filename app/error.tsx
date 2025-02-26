"use client"

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();
    const clerk = useClerk();

    console.error(error);

    return (
        <main>
            <h1>{error.message}</h1>
            {(!clerk.loaded || !clerk.user) && <button onClick={() => clerk.openSignIn()}>Logga in</button>}
            <button onClick={() => reset()}>Försök igen</button>
            <button onClick={() => router.push("/")}>Hem</button>
        </main>
    );
}