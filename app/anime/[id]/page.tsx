"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Genres } from "@/components/genres";
import { MyAnime } from "@/lib/interfaces";
import { getAnime } from "@/lib/client/jikan";
import { toggleSaved, updateAndSaveList } from "@/lib/client/clientutil";

export default function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  async function onSaveRemove(a: MyAnime) {
    toggleSaved(a);
    setAnime({ ...a });
  }
  async function onWatchedChanged() {
    setAnime(p => {
      if (!p)
        return null;
      p.watched = !p.watched;
      updateAndSaveList(p);
      return { ...p };
    });
  }

  const id = +use(params).id;
  const [anime, setAnime] = useState<MyAnime | null>(null);

  useEffect(() => {
    getAnime(id).then(res => {
      setAnime(res);
      document.title = "Mina Anime - " + (res.title_english ?? res.title);
    }).catch(err => {
      console.error("loadData:", err);
    })
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
            <input type="checkbox" checked={anime.watched} onChange={onWatchedChanged} />
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
        <div className={styles.rightflex}>
          <div className={styles.rightgrid}>
            <div>År:</div><div>{anime.year}</div>
            <div>Typ:</div><div>{anime.type}</div>
            <div><Link href={anime.trailer.url}>Trailer</Link></div><div></div>
          </div>
          <div className={styles.rightgrid}>
            <div>Status:</div><div>{anime.status}</div>
            <div>Källa:</div><div>{anime.source}</div>
            <div>Themes:</div><div>{anime.themes.map(t => t.name).join(", ")}</div>
          </div>
        </div>
        <p>{anime.synopsis}</p>
        <p>{anime.background}</p>
      </div>
    </main>
  );
}
