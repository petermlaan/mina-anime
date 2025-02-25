"use client";

import styles from "./page.module.css";
import React, { useEffect, useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAnimeContext } from "@/components/animecontext";
import { MyAnime } from "@/lib/interfaces";
import { Genres } from "@/components/genres";
import MyRating from "@/components/myrating";
import { getAnime } from "@/lib/client/clientutil";

export default function AnimePage({ params }: { params: Promise<{ id: number }> }) {
  const router = useRouter();
  const id = +use(params).id;
  const ac = useAnimeContext();
  const [anime, setAnime] = useState<MyAnime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(0);

  if (Number.isNaN(id))
    notFound();

  useEffect(() => {
    console.count("AnimePage useEffect");
    setError(0);
    let a = ac.myAnimes.find(a => a.mal_id === id) ?? null;
    if (a) {
      setAnime({...a});
    } else {
      getAnime(id).then(res => {
        a = res;
        setAnime({...res});
      }).catch(() => setError(1));
    }
    setLoading(false);
    document.title = "Mina Anime - " + (a?.title_english ?? a?.title);
  }, [id, ac.myAnimes]);

  const onToggleWatched = () => {
    if (anime?.saved) {
      const changes: Partial<MyAnime> = { watched: !anime.watched };
      ac.updateAnime(id, changes);
    }
  }

  const onAddRemove = () => {
    if (anime) {
      if (anime.saved)
        ac.removeAnime(id)
      else
        ac.addAnime(anime);
    }
  }

  if (loading) {
    return <div>Laddar anime...</div>;
  }

  if (error > 0 || !anime) {
    return (
      <div>Något gick fel.
        <button onClick={() => router.back()}>Tillbaka</button>
      </div>
    );
  }

  console.log("AnimePage - returning html: ", anime);
  
  return (
    <main className={styles.main}>
      <div className={styles.singleLeft}>
        <div className={styles.singleLeftToprow}>
          <button onClick={router.back}>Stäng</button>
          <button onClick={onAddRemove}>{anime.saved ? "Ta bort" : "Spara"}</button>
          {anime.saved && <label className="checkbox">Sedd:
            <input type="checkbox" checked={anime.watched} onChange={onToggleWatched} />
          </label>}
        </div>
        <Image
          className={styles.poster}
          width={240}
          height={360}
          src={(anime.images.jpg.large_image_url ?? anime.images.jpg.image_url) ?? "/favicon.jpg"}
          alt={`Bild på ${anime.title}`}
          priority
        />
        <Genres genres={anime.genres} />
      </div>
      <div className={styles.singleRight}>
        <div className={styles.singleRightToprow}>
          <span>Poäng: {(anime.score ? anime.score.toFixed(1) : "")}</span>
          {anime.saved && <MyRating anime={anime}></MyRating>}
        </div>
        <h2>{anime.title_english ?? anime.title}</h2>
        <h3>{anime.title}</h3>
        <div className={styles.rightflex}>
          <div className={styles.rightgrid}>
            <div>År:</div><div>{anime.year}</div>
            <div>Typ:</div><div>{anime.type}</div>
            <div>Trailer:{anime.trailer.url && <Link href={anime.trailer.url}>youtube</Link>}</div>
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
