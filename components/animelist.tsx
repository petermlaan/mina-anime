"use client";

import styles from "./animelist.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { MyAnime } from "@/lib/interfaces";
import { useAnimeContext } from "./animecontext";
import MyRating from "./myrating";

interface AnimeListProps {
    animes: MyAnime[];
    search: boolean; // true for searchPage, false for Page.
}

type TableColumn = "" | "title" | "score" | "myRating" | "watched";

export function AnimeList({ animes, search }: AnimeListProps) {
    const ac = useAnimeContext();
    const [lastSort, setLastSort] = useState<TableColumn>("");

    const onSort = (column: TableColumn) => {
        switch (column) {
            case "title":
                if (lastSort === "title") {
                    animes.sort((b, a) =>
                        a.title_english.localeCompare(b.title_english));
                    setLastSort("");
                } else {
                    animes.sort((b, a) =>
                        b.title_english.localeCompare(a.title_english));
                    setLastSort("title");
                }
                break;
                case "score":
                    if (lastSort === "score") {
                        animes.sort((a, b) => a.score - b.score);
                        setLastSort("");
                    } else {
                        animes.sort((a, b) => b.score - a.score);
                        setLastSort("score");
                    }
                    break;
                    case "myRating":
                        if (lastSort === "myRating") {
                            animes.sort((a, b) => a.myRating - b.myRating);
                            setLastSort("");
                        } else {
                            animes.sort((a, b) => b.myRating - a.myRating);
                            setLastSort("myRating");
                        }
                        break;
                        case "watched":
                            if (lastSort === "watched") {
                                animes.sort(a => +a.watched);
                                setLastSort("");
                            } else {
                                animes.sort(a => +!a.watched);
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
                        {!search && <th><Link href={"#"} onClick={() => onSort("myRating")}>Sedd</Link></th>}
                        <th><Link href={"#"} onClick={() => onSort("score")}>Poäng</Link></th>
                        {!search && <th><Link href={"#"} onClick={() => onSort("myRating")}>Betyg</Link></th>}
                        <th><Link href={"#"} onClick={() => onSort("title")}>Titel</Link></th>
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
                {anime.title_english}
            </Link></div></td>
        </tr>
    );
}
