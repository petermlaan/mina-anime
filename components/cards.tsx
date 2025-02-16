"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";
import { Anime } from '@tutkli/jikan-ts';
import React from "react";
import { Genres } from "./genres";

export function Cards({ animes }: { animes: Anime[] }) {
    return (
        <section className={styles.cards}>
            {animes.map((a, i) =>
                <Card key={i} anime={a} />
            )}
        </section>
    );
}

export function Card({ anime }: { anime: Anime }) {
    return (
        <article className={styles.cardSmall}>
            <div className={styles.cardToprow}>
                <button onClick={() => onSave(anime)}>Spara</button>
                Poäng: {anime.score}
            </div>
            <Link href={"anime/" + anime.mal_id}>
                <h2>{anime.title_english ?? anime.title}</h2>
            </Link>
            <Link href={"anime/" + anime.mal_id}>
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
/*
const fetchSelections = async (passkey: string) => {
    const response = await fetch(`/api/anime-selections?passkey=${passkey}`);
    if (!response.ok) throw new Error('Failed to fetch selections');
    return response.json();
};*/

async function onSave(anime: Anime) {
    console.log("saving card", anime);
    const response = await fetch('/api/anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: "minatesta", animeData: [anime] }),
    });
    if (!response.ok) 
        throw new Error('Failed to save selection');
}