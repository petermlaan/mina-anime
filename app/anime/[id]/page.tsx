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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;
    let a = ac.myAnimes.find(a => a.mal_id === id) ?? null;
    if (a) {
      setAnime({ ...a });
    } else {
      getAnime(id).then(res => {
        if (mounted) {
          a = res;
          setAnime({ ...res });
        }
      }).catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });
    }
    if (a && mounted) {
      setText(a.text);
      setLoading(false);
      document.title = "Mina Anime - " + a.title_english;
    }

    return () => { mounted = false };
  }, [id, ac.myAnimes]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!window) {
      console.error("SHOULD NOT HAPPEN! onTextChange called from server.")
      return;
    }
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

  if (loading || !anime) {
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
        <Image
          className={styles.poster}
          width={240}
          height={360}
          src={anime.poster}
          alt={`Bild på ${anime.title}`}
          priority
        />
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
        {anime.saved && <>
          <textarea
            className={styles.text}
            onChange={(e) => onTextChange(e)}
            value={text}
            placeholder="Skriv en kommentar eller recension..." />
        </>}
      </div>

    </main>
  );
}
