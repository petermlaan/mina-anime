import { Anime } from "@tutkli/jikan-ts";

export interface MyAnime extends Anime {
    saved?: boolean;
    watched?: boolean;
    myRating?: number;
};