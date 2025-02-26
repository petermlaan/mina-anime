import { Anime } from "@tutkli/jikan-ts";

export interface MyAnime extends Anime {
    saved: boolean;
    watched: boolean;
    myRating: number;
    text: string;
    title_english: string;
    poster: string;
};