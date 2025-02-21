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
    onRemoveAnime?: (animeId: number) => void;
}

export function Cards({ animes, onRemoveAnime }: CardsProps) {
    return (
        <section className={styles.cards}>
            {animes.map((a, i) =>
                <Card 
                    key={i} 
                    anime={a} 
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
    onRemove: () => void;
}

export function Card({ anime, onRemove }: CardProps) {    return (
        <article className={styles.cardSmall}>
            <div className={styles.cardToprow}>
                <button onClick={onRemove}>{anime.saved ? "Ta bort" : "Spara"}</button>
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
