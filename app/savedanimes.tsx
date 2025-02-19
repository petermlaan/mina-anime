import React from "react";
import { dbLoadAnimes } from "@/lib/db";
import { Cards } from '../components/cards';
//import { unstable_noStore as noStore } from 'next/cache';
import { auth } from "@clerk/nextjs/server";
 
export async function SavedAnimes({ showList }: {showList: boolean}) {
    //noStore();
    const { userId } = await auth();
    console.log("SavedAnimes: ",  showList);
    if (!userId) {
        return <div>Logga in för att se dina sparade anime.</div>;
    }
    if (!userId)
        return (<>Logga in!</>);
    const animes = await dbLoadAnimes(userId);
    return (
      <Cards animes={animes ?? []} />
    );
}
