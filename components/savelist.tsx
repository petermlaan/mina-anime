"use client";

import { saveList } from "@/lib/clientutil";

export function SaveListButton() {
    return (
        <button onClick={() => saveList()}>
            Spara listan
        </button>
    );
}