"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Anime, AnimeClient } from '@tutkli/jikan-ts';
import Link from "next/link";
import { Genres } from "@/components/genres";

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
        document.title = "Mina Anime - " + (animeData.title_english ?? animeData.title);
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
        <h2>{anime.title_english ?? anime.title}</h2>
        <h3>{anime.title}</h3>
        <Image 
          width={240} 
          height={360} 
          src={(anime.images.jpg.large_image_url ?? anime.images.jpg.image_url) ?? ""} 
          alt={`Bild på ${anime.title}`} 
          priority
        />
        <Genres genres={anime.genres}/>
        <p>Typ: {anime.type}</p>
        <p>År: {anime.year}</p>
        <p>Källa: {anime.source}</p>
        <p>Status: {anime.status}</p>
        <p><Link href={anime.trailer.url}>Trailer</Link></p>
        <p>Themes: {anime.themes.map(t => t.name).join(", ")}</p>
        <p>{anime.synopsis}</p>
        <p>{anime.background}</p>
      </main>
    </div>
  );
}