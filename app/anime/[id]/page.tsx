"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Genres } from "@/components/genres";
import { MyAnime } from "@/lib/interfaces";
import { getAnime } from "@/lib/client/jikan";
import { useAnimeContext } from "@/components/animecontext";
import MyRating from "@/components/myrating";
import { notFound, useRouter } from "next/navigation";

export default function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const id = +use(params).id;
  const ac = useAnimeContext();
  const [anime, setAnime] = useState<MyAnime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (Number.isNaN(id))
    notFound();

  const onToggleWatched = () => {
    if (anime) {
      const changes: Partial<MyAnime> = { watched: !anime.watched };
      setAnime({ ...anime, ...changes });
      ac.updateAnime(id, changes)
    }
  }

  const onAddRemove = () => {
    if (anime) {
      const changes: Partial<MyAnime> = { saved: !anime.saved };
      setAnime({ ...anime, ...changes });
      if (anime.saved)
        ac.removeAnime(id)
      else
        ac.addAnime(anime);
    }
  }

  useEffect(() => {
    setLoading(true);
    setError(false);
    let a = ac.myAnimes.find(a => a.mal_id === id) ?? null;
    if (a)
      setAnime(a);
    else
      getAnime(id).then(res => {
        a = res;
        setAnime(res);
      }).catch(() => setError(true));
    setLoading(false);
    document.title = "Mina Anime - " + (a?.title_english ?? a?.title);
  }, [id, ac.myAnimes]);

  if (loading) {
    return <div>Laddar anime...</div>;
  }

  if (error || !anime) {
    return <div>Något gick fel</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.singleLeft}>
        <div className={styles.singleLeftToprow}>
          <button onClick={router.back}>Stäng</button>
          <button onClick={onAddRemove}>{anime.saved ? "Ta bort" : "Spara"}</button>
          <label className="checkbox">Sedd:
            <input type="checkbox" checked={anime.watched} onChange={onToggleWatched} />
          </label>
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
