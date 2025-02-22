"use client";

import { saveList } from "@/lib/client/clientutil";

export function SaveListButton() {
    return (
        <button onClick={() => saveList()}>
            Spara listan
        </button>
    );
}