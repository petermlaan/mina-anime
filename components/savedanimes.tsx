import React from "react";
import { Anime } from '@tutkli/jikan-ts';
import { supabase } from "@/lib/db";
import { Cards } from './cards';
import { unstable_noStore } from 'next/cache';

export async function SavedAnimes({ showList }: {showList: boolean}) {
    unstable_noStore();
    console.log("SavedAnimes: reading from db", showList)
    const { data, error } = await supabase
        .from("user_anime_selections")
        .select("anime_data");
    if (error)
        console.error(error);
    let animes: Anime[] = [];
    if (data)
        animes = data[0].anime_data;

    return (
      <Cards animes={animes} />
    );
}

