"use client"

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();
    const clerk = useClerk();

    console.log("Error page: ", error?.name, error?.message);

    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        if (isNavigating) {
            router.push('/');
        }
    }, [isNavigating, router]);
    
    const handleHomeClick = () => {
        setIsNavigating(true);
    };
    
    let errormsg = error?.message ?? "Någonting gick fel.";
    if (error?.name === "AxiosError")
        errormsg = "Sidan kunde inte hittas.";

    return (
        <main>
            <h1>{errormsg}</h1>
            {(!clerk.loaded || !clerk.user) &&
                <button onClick={() => clerk.openSignIn()}>Logga in</button>}
            <button onClick={() => reset()}>Försök igen</button>
            <button onClick={() => handleHomeClick()}>Hem</button>
        </main>
    );
}