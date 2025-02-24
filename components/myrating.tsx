"use client"

import React from "react";
import { MyAnime } from "@/lib/interfaces";
import { useAnimeContext } from "./animecontext";

interface MyRatingProps {
    anime: MyAnime
}

export default function MyRating({ anime }: MyRatingProps) {
    const ac = useAnimeContext();

    return (
        <div>
            Betyg:
            <select onChange={(e) => ac.updateAnime(anime.mal_id, {myRating: +e.target.value})}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                    <option value={v} key={v}>{v}</option>
                ))}
            </select>
        </div>
    );
}