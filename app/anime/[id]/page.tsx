"use client";

import styles from "./page.module.css";
import React, { useEffect, useState, use, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAnimeContext } from "@/components/animecontext";
import { MyAnime } from "@/lib/interfaces";
import { Genres } from "@/components/genres";
import MyRating from "@/components/myrating";
import { debounce, getAnime } from "@/lib/client/clientutil";
import { DEBOUNCE_TEXT_DELAY } from "@/lib/constants";

export default function AnimePage({ params }: { params: Promise<{ id: number }> }) {
  console.log("AnimePage");
  const router = useRouter();
  const id = +use(params).id;
  const ac = useAnimeContext();
  const [anime, setAnime] = useState<MyAnime | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setError(null);
    getAnime(id, ac.myAnimes).then(res => {
      setAnime({ ...res });
      setText(res.text);
      document.title = res.title_english + " - Mina Anime";
    }).catch((err) => setError(err));
  }, [id, ac.myAnimes]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!window) {
      console.error("SHOULD NOT HAPPEN! onTextChange called from server.")
      return;
    }
    console.log("onTextChange");
    setText(e.target.value);
    debounce(DEBOUNCE_TEXT_DELAY, () =>
      ac.updateAnime(id, { text: e.target.value })
    );
  }

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

  if (error)
    throw error;

  if (!anime) {
    return <div>Laddar anime...</div>;
  }

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
        <Link href={anime.poster}>
        <Image
          className={styles.poster}
          width={240}
          height={360}
          src={anime.poster}
          alt={`Bild på ${anime.title}`}
          priority/>
        </Link>
        <Genres genres={anime.genres} />
      </div>

      <div className={styles.singleRight}>
        <div className={styles.singleRightToprow}>
          <span>Poäng: {anime.score.toFixed(1)}</span>
          {anime.saved && <label>Betyg: <MyRating anime={anime}></MyRating></label>}
        </div>
        <h2>{anime.title_english}</h2>
        <h3>{anime.title}</h3>
        <div className={styles.rightflex}>
          <div className={styles.rightgrid}>
            <div>År:</div><div>{anime.year > 0 && anime.year}</div>
            <div>Typ:</div><div>{anime.type}</div>
            <div>Trailer:</div><div>{anime.yturl && <Link href={anime.yturl}>youtube</Link>}</div>
            <div>Score:</div><div>{anime.score}</div>
            <div>Scored by:</div><div>{anime.scored_by}</div>
            <div>Favorites:</div><div>{anime.favorites}</div>
          </div>
          <div className={styles.rightgrid}>
            <div>Status:</div><div>{anime.status}</div>
            <div>Källa:</div><div>{anime.source}</div>
            <div>Themes:</div><div>{anime.themes.join(", ")}</div>
            <div>Episodes:</div><div>{anime.episodes}</div>
            <div>Rank:</div><div>{anime.rank}</div>
            <div>Popularity:</div><div>{anime.popularity}</div>
          </div>
        </div>
        <p>{anime.synopsis}</p>
        <p>{anime.background}</p>
        {anime.saved && <>
          <textarea
            className={styles.text}
            onChange={(e) => onTextChange(e)}
            value={text}
            maxLength={1000}
            placeholder="Skriv en kommentar eller recension..." />
        </>}
      </div>

    </main>
  );
}
