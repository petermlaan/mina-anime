import React from "react";
import { dbLoadAnimes } from "@/lib/db";
import { Cards } from '../components/cards';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
 
export async function SavedAnimes({ showList }: {showList: boolean}) {
    noStore();
    const user = await currentUser();
    console.log("getListSA user: " + user);
    if (!user) {
        return <div>Logga in för att se dina sparade anime.</div>;
    }
    const passkey = user.id;
    if (!passkey)
        return (<>Logga in!</>);
    const animes = await dbLoadAnimes(passkey);
    return (
      <Cards animes={animes ?? []} />
    );
}
