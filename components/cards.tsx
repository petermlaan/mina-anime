"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";
import React from "react";
import { Genres } from "./genres";
import { MyAnime } from "@/lib/interfaces";
import { addAnime, removeAnime } from "@/lib/clientutil";

async function onSaveRemove(anime: MyAnime) {
    if (anime.saved) {
        removeAnime(anime);
    } else {
        anime.watched = false;
        anime.myRating = 0;
        addAnime(anime);
    }
}

interface CardsProps {
    animes: MyAnime[];
    search: boolean;
    onRemoveAnime?: (animeId: number) => void;
}

export function Cards({ animes, search, onRemoveAnime }: CardsProps) {
    return (
        <section className={styles.cards}>
            {animes.map((a, i) =>
                <Card 
                    key={i} 
                    anime={a}
                    search={search} 
                    onRemove={() => {
                        onSaveRemove(a);
                        if (onRemoveAnime)
                            onRemoveAnime(a.mal_id);
                    }} />
            )}
        </section>
    );
}

interface CardProps {
    anime: MyAnime;
    search: boolean;
    onRemove: () => void;
}

export function Card({ anime, search, onRemove }: CardProps) {    return (
        <article className={styles.cardSmall}>
            <div className={styles.cardToprow}>
                <button onClick={onRemove} className={(search && anime.saved) ? "disabled" : ""}>{search ? "Spara" : "Ta bort"}</button>
                Poäng: {anime.score}
            </div>
            <Link href={"anime/" + anime.mal_id} prefetch={false}>
                <h2>{anime.title_english ?? anime.title}</h2>
            </Link>
            <Link href={"anime/" + anime.mal_id} prefetch={false}>
                <Image
                    src={anime.images.jpg.large_image_url ?? ""}
                    width={240} height={360}
                    className={styles.poster}
                    alt={"Poster för " + anime.title_english} />
            </Link>
            <Genres genres={anime.genres} />
        </article>
    );
}
