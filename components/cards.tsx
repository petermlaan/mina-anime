import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";
import { Anime } from '@tutkli/jikan-ts';

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
                Poäng: {anime.score}
            </div>
            <Link href={"anime"}>
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