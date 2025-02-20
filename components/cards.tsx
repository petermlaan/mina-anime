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
        console.log("onSaveRemove removing...");
        removeAnime(anime);
    } else {
        console.log("onSaveRemove saving...");
        anime.watched = false;
        anime.myRating = 0;
        addAnime(anime);
    }
}

export function Cards({ animes }: { animes: MyAnime[] }) {
    return (
        <section className={styles.cards}>
            {animes.map((a, i) =>
                <Card key={i} anime={a} />
            )}
        </section>
    );
}

export function Card({ anime }: { anime: MyAnime }) {
    return (
        <article className={styles.cardSmall}>
            <div className={styles.cardToprow}>
                <button onClick={() => onSaveRemove(anime)}>{anime.saved ? "Ta bort" : "Spara"}</button>
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
