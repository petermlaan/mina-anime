import { fetchJSON } from "./app/util";

export async function searchAnimes(query: string) {
    const url = "https://api.jikan.moe/v4/anime?q=" + query;
    const data: AnimeList = await fetchJSON(url);
    return data;
}

export class AnimeList {
    pagination: Pagination;
/*        items: {
            count: number;
            per_page: number;
            total: 42;
        };*/
    data: Anime[];

    constructor (pagination: Pagination, data: Anime[]) {
        this.pagination = pagination;
        this.data = data;
    }
}

export class Pagination {
    current_page: number = 0;
    has_next_page: boolean = false;
    last_page_visible: number = 0;
}

export class Anime {
    mal_id: number;
    title: string;
    title_english: string;
    saved: boolean;
    watched: boolean;
    myRating: number;

    constructor(
        mal_id: number, title: string, title_english: string
//        , poster_s1, poster_s2, poster_s3
//        , synopsis, background, aired, genres, source, type, score
        , saved: boolean, watched: boolean, myRating: number) {

        this.mal_id = mal_id;
        this.title = title ? title : title_english;
        this.title_english = title_english ? title_english : title;
/*        this.poster_s1 = poster_s1;
        this.poster_s2 = poster_s2;
        this.poster_s3 = poster_s3;
        this.synopsis = synopsis ?? "";
        this.background = background ?? "";
        this.aired = aired ? (new Date(aired)).toLocaleDateString("se-sv") : "";
        this.genres = genres;
        this.source = source;
        this.type = type;
        this.score = score ?? 0;*/
        this.saved = saved;
        this.watched = watched;
        this.myRating = myRating;
    }

}
