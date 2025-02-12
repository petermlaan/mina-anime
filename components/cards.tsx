import { Anime } from "@/anime";

export function Cards({ animes }: { animes: Anime[] }) {
    return (<>
        {animes.map(a => (
        <Card key={a.mal_id} anime={a} />
            ))}
    </>);
}

export function Card({ anime }: { anime: Anime }) {
    return (<>
        <h2>{anime.mal_id + " " + anime.title_english}</h2>
    </>);
}