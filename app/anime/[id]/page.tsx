"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Genres } from "@/components/genres";
import { MyAnime } from "@/lib/interfaces";
import { addAnime, removeAnime } from "@/lib/client/clientutil";
import { getAnime } from "@/lib/client/jikan";

async function onSaveRemove(anime: MyAnime) {
  if (anime.saved) {
    removeAnime(anime);
  } else {
    anime.watched = false;
    anime.myRating = 0;
    addAnime(anime);
  }
}

export default function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const id = +React.use(params).id;
  const [anime, setAnime] = useState<MyAnime | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getAnime(id);
        setAnime(res);
        document.title = "Mina Anime - " + (res.title_english ?? res.title);
      } catch (err) {
        console.error("loadData:", err);
      }
    };
    loadData();
  }, [id]);

  if (!anime) {
    return <div>Laddar anime...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.singleLeft}>
        <div className={styles.singleLeftToprow}>
          <button onClick={() => onSaveRemove(anime)}>{anime.saved ? "Ta bort" : "Spara"}</button>
          <div></div>
          <label>Sedd
            <input type="checkbox" />
          </label>
        </div>
        <Image
          className={styles.poster}
          width={240}
          height={360}
          src={(anime.images.jpg.large_image_url ?? anime.images.jpg.image_url) ?? ""}
          alt={`Bild på ${anime.title}`}
          priority
        />
        <Genres genres={anime.genres} />
      </div>
      <div>
        <div className={styles.singleRightToprow}>
          <span>Poäng: {(anime.score ? anime.score.toFixed(1) : "")}</span>
          <div>Betyg: </div>
        </div>
        <h2>{anime.title_english ?? anime.title}</h2>
        <h3>{anime.title}</h3>
        <p>Typ: {anime.type}</p>
        <p>År: {anime.year}</p>
        <p>Källa: {anime.source}</p>
        <p>Status: {anime.status}</p>
        <p><Link href={anime.trailer.url}>Trailer</Link></p>
        <p>Themes: {anime.themes.map(t => t.name).join(", ")}</p>
        <p>{anime.synopsis}</p>
        <p>{anime.background}</p>
      </div>
    </main>
  );
}