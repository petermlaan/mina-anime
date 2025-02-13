import Image from "next/image";
import styles from "./page.module.css";
import { AnimeClient } from '@tutkli/jikan-ts';

export default async function PageAnime({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    console.log("PageAnime - params.id = " + id);
    const jikanAPI = new AnimeClient({ enableLogging: true });
    const anime = (await jikanAPI.getAnimeById(+id)).data;
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>{anime.title_english ?? anime.title}</h1>
          <h2>{anime.title}</h2>
          {anime.mal_id}
          <Image width={240} height={360} src={anime.images.jpg.large_image_url ?? anime.images.jpg.image_url} alt={"Bild av anime " + anime.title} />
          <p>{anime.synopsis}</p>
        </main>
      </div>
    );
  }
  catch (err) {
    console.log(err);
  }
}
