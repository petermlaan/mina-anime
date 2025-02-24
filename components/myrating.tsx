"use client"

import React from "react";
import { MyAnime } from "@/lib/interfaces";
import { useAnimeContext } from "./animecontext";

interface MyRatingProps {
    anime: MyAnime
}

export default function MyRating({ anime }: MyRatingProps) {
    const ac = useAnimeContext();

    const onRating = (mal_id: number, myRating: number) => {
        console.log("MyRating - onRating: " + myRating, mal_id);
        ac.updateAnime(mal_id, { myRating });
    }

    return (
        <div>
            Betyg:
            <select value={anime.myRating} onChange={(e) => onRating(anime.mal_id, +e.target.value)}>
                <option value={0} key={0}>Betyg</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                    <option value={v} key={v}>{v}</option>
                ))}
            </select>
        </div>
    );
}