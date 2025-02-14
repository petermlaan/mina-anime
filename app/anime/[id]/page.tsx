"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Anime, AnimeClient } from '@tutkli/jikan-ts';

export default function PageAnime({ params }: { params: Promise<{ id: string }> }) {
  // State
  const id = React.use(params).id;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [errormsg, setErrormsg] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const jikanAPI = new AnimeClient({ enableLogging: true });
        const animeData = (await jikanAPI.getAnimeById(+id)).data;
        setAnime(animeData);
        if (!animeData) {
          setErrormsg("Ingen animedata!");
        }
      } catch (err) {
        setErrormsg("Fel! Ingen animedata!" + err);
      }
    };
    loadData();
  }, [id]);

  if (!anime) {
    if (errormsg)
      return <div>{errormsg}</div>;
    return <div>Laddar anime...</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{anime.title_english ?? anime.title}</h1>
        <h2>{anime.title}</h2>
        <p>MAL ID: {anime.mal_id}</p>
        <Image 
          width={240} 
          height={360} 
          src={(anime.images.jpg.large_image_url ?? anime.images.jpg.image_url) ?? ""} 
          alt={`Bild på ${anime.title}`} 
          priority
        />
        <p>{anime.synopsis}</p>
      </main>
    </div>
  );
}