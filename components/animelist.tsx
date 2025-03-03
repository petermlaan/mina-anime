"use client";

import styles from "./animelist.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MyAnime } from "@/lib/interfaces";
import { useAnimeContext } from "./animecontext";
import MyRating from "./myrating";

interface AnimeListProps {
    animes: MyAnime[];
    search: boolean; // true for searchPage, false for Page (saved animes).
}
type TableColumn = "" | "title" | "score" | "myRating" | "watched";

export function AnimeList({ animes, search = false }: AnimeListProps) {
    const ac = useAnimeContext();
    const [lastSort, setLastSort] = useState<TableColumn>("");
    const [sortedAnimes, setSortedAnimes] = useState(animes);

    useEffect(() => {
        setSortedAnimes(animes);
    }, [animes]);

    const onSort = (column: TableColumn) => {
        switch (column) {
            case "title":
                if (lastSort === "title") {
                    setSortedAnimes(sortedAnimes.sort((a, b) =>
                        b.title_english.localeCompare(a.title_english)));
                    setLastSort("");
                } else {
                    setSortedAnimes(sortedAnimes.sort((a, b) =>
                        a.title_english.localeCompare(b.title_english)));
                    setLastSort("title");
                }
                break;
            case "score":
                if (lastSort === "score") {
                    setSortedAnimes(sortedAnimes.sort((a, b) => a.score - b.score));
                    setLastSort("");
                } else {
                    setSortedAnimes(sortedAnimes.sort((a, b) => b.score - a.score));
                    setLastSort("score");
                }
                break;
            case "myRating":
                if (lastSort === "myRating") {
                    setSortedAnimes(sortedAnimes.sort((a, b) => a.myRating - b.myRating));
                    setLastSort("");
                } else {
                    setSortedAnimes(sortedAnimes.sort((a, b) => b.myRating - a.myRating));
                    setLastSort("myRating");
                }
                break;
            case "watched":
                if (lastSort === "watched") {
                    setSortedAnimes(sortedAnimes.sort((a, b) => +a.watched - +b.watched));
                    setLastSort("");
                } else {
                    setSortedAnimes(sortedAnimes.sort((a, b) => +b.watched - +a.watched));
                    setLastSort("watched");
                }
                break;
        }
    };

    return (
        <section className={styles.list}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {!search && <th className="px2"><Link href={"#"}
                            onClick={() => onSort("watched")}>Sedd</Link></th>}
                        <th className="px2"><Link href={"#"}
                            onClick={() => onSort("score")}>Poäng</Link></th>
                        {!search && <th className="px2"><Link href={"#"}
                            onClick={() => onSort("myRating")}>Betyg</Link></th>}
                        <th className="px2 tal"><Link href={"#"}
                            onClick={() => onSort("title")}>Titel</Link></th>
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
                className={(search && anime.saved) ? "disabled btn" : "btn"}
                disabled={search && anime.saved}>
                {search ? "Spara" : "Ta bort"}
            </button></td>
            {!search && <td className="tac">
                <input
                    type='checkbox'
                    checked={anime.watched}
                    onChange={() => ac.updateAnime(anime.mal_id, { watched: !anime.watched })} />
            </td>}
            <td className="px2 tac"><div>{anime.score.toFixed(1)}</div></td>
            {!search && <td className="px2">{anime.saved && <MyRating anime={anime}></MyRating>}</td>}
            <td className="px2"><div><Link href={"anime/" + anime.mal_id} prefetch={false}>
                {anime.title_english}
            </Link></div></td>
        </tr>
    );
}
