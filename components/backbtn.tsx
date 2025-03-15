"use client";
import { useRouter } from "next/navigation";

export default function BackBtn() {
    const router = useRouter();

    return (
        <button onClick={router.back}>Stäng</button>
    );
}