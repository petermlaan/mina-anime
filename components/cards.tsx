interface Anime {
    mal_id: number;
    title: string;
    title_en: string;
}

export function Cards({ animes }: { animes: Anime[] }) {
    return (<>
        {animes.map((a, i) => (
        <Card key={i} anime={a} />
            ))}
    </>);
}

export function Card({ anime }: { anime: Anime }) {
    return (<>
        <h2>{anime.mal_id}</h2>
    </>);
}