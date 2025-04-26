
export interface MyAnime {
    // New properties
    saved: boolean;
    watched: boolean;
    myRating: number;
    text: string;

    // Modified properties
    poster: string;
    yturl: string;

    mal_id: number;
    title: string;
    title_english: string;
    type: string;
    source: string;
    episodes: number;
    status: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    favorites: number;
    synopsis: string;
    background: string;
    year: number;
    genres: string[];
    themes: string[];
}