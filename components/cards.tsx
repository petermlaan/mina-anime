import { Anime } from "@/anime";
import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";

export function Cards({ animes }: { animes: Anime[] }) {
    console.log(animes);
    
    return (<>
        {animes.map((a, i) => (
            <Card key={i} anime={a} />
        ))}
    </>);
}

export function Card({ anime }: { anime: Anime }) {
    return (
        <article className={styles.animeCard}>
            <div className={styles.cardToprow}>
                Poäng: {anime.score}
            </div>
            <Link href={"anime"}>
                <h2>{anime.title_english}</h2>
            </Link>
            <Link href={"anime"}>
                <Image src={anime.images.jpg.large_image_url} width={240} height={360} className={styles.poster} alt={"Poster för " + anime.title_english} />
            </Link>
            <div>
                {anime.genres.map(g => g.name + " ")}
            </div>
        </article>
    );
}