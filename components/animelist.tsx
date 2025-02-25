"use client";

import styles from "./animelist.module.css";
import Link from "next/link";
import React from "react";
import { MyAnime } from "@/lib/interfaces";
import { useAnimeContext } from "./animecontext";
import MyRating from "./myrating";

interface AnimeListProps {
    animes: MyAnime[];
    search: boolean;
}

export function AnimeList({ animes, search }: AnimeListProps) {
    const ac = useAnimeContext();

    return (
        <section className={styles.list}>
            <table>
                <thead>
                    <tr>
                        <th>Knapp</th>
                        {!search && <th>Sedd</th>}
                        <th>Poäng</th>
                        {!search && <th>Betyg</th>}
                        <th>Titel</th>
                    </tr>
                </thead>
                <tbody>
                    {animes.map((a, i) => !(ac.hideWatched && a.watched) &&
                        <AnimeRow key={i} anime={a} search={search} />)}
                </tbody>
            </table>
        </section>
    );
}

interface AnimeRowProps {
    anime: MyAnime;
    search: boolean;
}

export function AnimeRow({ anime, search }: AnimeRowProps) {
    const ac = useAnimeContext();

    return (
        <tr>
            <td><button
                onClick={() => anime.saved ?
                    ac.removeAnime(anime.mal_id) : ac.addAnime(anime)}
                className={(search && anime.saved) ? "disabled btn" : "btn"}>
                {search ? "Spara" : "Ta bort"}
            </button></td>
            {!search && <td><div>
                 <input
                    type='checkbox'
                    checked={anime.watched}
                    onChange={() => ac.updateAnime(anime.mal_id, { watched: !anime.watched })} />
            </div></td>}
            <td><div>{anime.score.toFixed(1)}</div></td>
            {!search && <td>{anime.saved && <MyRating anime={anime}></MyRating>}</td>}
            <td><div><Link href={"anime/" + anime.mal_id} prefetch={false}>
                {anime.title_english ?? anime.title}
            </Link></div></td>
        </tr>
    );
}
