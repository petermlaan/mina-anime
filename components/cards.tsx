"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";
import React from "react";
import { Genres } from "./genres";
import { MyAnime } from "@/lib/interfaces";
import { useAnimeContext } from "./animecontext";

interface CardsProps {
    animes: MyAnime[];
    search?: boolean;
}

export function Cards({ animes, search = false }: CardsProps) {
    const ac = useAnimeContext();

    return (
        <section className={styles.cards}>
            {animes.map((a, i) => !(ac.hideWatched && a.watched) &&
                <Card key={i} anime={a} search={search} />
            )}
        </section>
    );
}

interface CardProps {
    anime: MyAnime;
    search: boolean;
}

export function Card({ anime, search }: CardProps) {
    const ac = useAnimeContext();

    return (
        <article className={styles.cardSmall}>
            <div className={styles.cardToprow}>
                <button
                    onClick={() => anime.saved ?
                        ac.removeAnime(anime.mal_id) :
                        ac.addAnime(anime)}
                    className={(search && anime.saved) ? "disabled btn" : "btn"}
                    disabled={search && anime.saved}>
                    {search ? "Spara" : "Ta bort"}
                </button>
                <div>Poäng: {anime.score.toFixed(1)}</div>
                <div>
                    {!search && (
                        <label className="checkbox">Sedd
                            <input type='checkbox'
                                checked={anime.watched}
                                onChange={() => ac.updateAnime(anime.mal_id, { watched: !anime.watched })} />
                        </label>
                    )}
                </div>
            </div>
            <Link href={"anime/" + anime.mal_id} prefetch={false}>
                <h2>{anime.title_english}</h2>
            </Link>
            <Link href={"anime/" + anime.mal_id} prefetch={false}>
                <Image
                    src={anime.poster}
                    width={240} height={360}
                    className={styles.poster}
                    alt={"Poster för " + anime.title_english} />
            </Link>
            <Genres genres={anime.genres} />
        </article>
    );
}
