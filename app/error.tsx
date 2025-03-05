"use client"

import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string, response?: { status?: number } };
    reset: () => void;
}) {
    const router = useRouter();

    let errormsg = error?.message ?? "Någonting gick fel.";
    if (error?.name === "AxiosError" && error?.response?.status === 404)
        errormsg = "Sidan kunde inte hittas.";

    return (
        <main className="grid justify-center justify-items-center gap-4 mt-8">
            <h1 className="text-2xl">{errormsg}</h1>
            <div className="flex gap-4">
                <button onClick={() => reset()}>Försök igen</button>
                <button onClick={() => router.push('/')}>Hem</button>
            </div>
        </main>
    );
}