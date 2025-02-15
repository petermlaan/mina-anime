"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";
import { Anime } from '@tutkli/jikan-ts';
import React from "react";

export function Cards({ animes }: { animes: Anime[] }) {
    return (<div className={styles.cards}>
        {animes.map((a, i) => (
            <Card key={i} anime={a} />
        ))}
    </div>);
}

export function Card({ anime }: { anime: Anime }) {
    return (
        <article className={styles.cardSmall}>
            <div className={styles.cardToprow}>
                <button onClick={onSave}>Spara</button>
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
            <div>
                {anime.genres.map(g => g.name + " ")}
            </div>
        </article>
    );
}
/*
const saveSelection = async (passkey: string, animeData: any) => {
    const response = await fetch('/api/anime-selections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey, animeData }),
    });
    if (!response.ok) throw new Error('Failed to save selection');
    return response.json();
};

const fetchSelections = async (passkey: string) => {
    const response = await fetch(`/api/anime-selections?passkey=${passkey}`);
    if (!response.ok) throw new Error('Failed to fetch selections');
    return response.json();
};*/

function onSave(e: React.MouseEvent) {
    console.log("saving card", e);
}