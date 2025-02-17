import React from "react";
import { Anime } from '@tutkli/jikan-ts';
import { supabase } from "@/lib/db";
import { Cards } from '../components/cards';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from "next/headers";

export async function SavedAnimes({ showList }: {showList: boolean}) {
    noStore();
    const passkey = (await cookies()).get("passkey")?.value;
    console.log("SavedAnimes: reading from db", passkey, showList);
    if (!passkey)
        return (<>Logga in!</>);
    const { data, error } = await supabase
        .from("user_anime_selections")
        .select("anime_data")
        .eq("user_passkey", passkey);
    if (error)
        console.error(error);
    let animes: Anime[] = [];
    if (data && data.length > 0)
        animes = data[0].anime_data;

    return (
      <Cards animes={animes} />
    );
}

