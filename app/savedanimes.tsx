import React from "react";
import { loadAnimes } from "@/lib/db";
import { Cards } from '../components/cards';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from "next/headers";
 
export async function SavedAnimes({ showList }: {showList: boolean}) {
    noStore();
    const passkey = (await cookies()).get("passkey")?.value;
    console.log("SavedAnimes: reading from db", passkey, showList);
    if (!passkey)
        return (<>Logga in!</>);
    const animes = await loadAnimes(passkey);
    return (
      <Cards animes={animes ?? []} />
    );
}
