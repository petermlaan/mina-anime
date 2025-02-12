import { fetchJSON } from "./app/util";

export async function searchAnimes(query: string) {
    const url = "https://api.jikan.moe/v4/anime?sfw&q=" + query;
    const data: AnimeList = await fetchJSON(url);
    return data;
}

export class AnimeList {
    pagination: Pagination;
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

export class JPG {
    image_url: string = "";
    large_image_url: string = "";
    small_image_url: string = "";
}

export class Images {
    jpg: JPG = new JPG();
}

export class Genre {
    mal_id: number = 0;
    name: string = "";
    type: string = "";
    url: string = "";
}

export class Anime {
    mal_id: number;
    title: string;
    title_english: string;
    images: Images;
    synopsis: string;
    background: string;
    genres: Genre[];
    source: string;
    type: string;
    score: string;
    saved: boolean;
    watched: boolean;
    myRating: number;

    constructor(
        mal_id: number, title: string, title_english: string
        , images: Images
        , synopsis: string, background: string, genres: Genre[]
        , source: string, type: string, score: string
        , saved: boolean, watched: boolean, myRating: number) {
// aired
        this.mal_id = mal_id;
        this.title = title ? title : title_english;
        this.title_english = title_english ? title_english : title;
        this.images = images;
        this.synopsis = synopsis ?? "";
        this.background = background ?? "";
//        this.aired = aired ? (new Date(aired)).toLocaleDateString("se-sv") : "";
        this.genres = genres;
        this.source = source;
        this.type = type;
        this.score = score;
        this.saved = saved;
        this.watched = watched;
        this.myRating = myRating;
    }

}
