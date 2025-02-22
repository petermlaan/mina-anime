import { AnimeClient, AnimeSearchParams, JikanResponse } from "@tutkli/jikan-ts";
import { getList } from "./clientutil";
import { MyAnime } from "../interfaces";

const jikanAPI = new AnimeClient({ enableLogging: true });

export async function getAnime(id: number): Promise<MyAnime> {
    let anime: MyAnime | undefined;
    const list = await getList();
    anime = list.find(a => a.mal_id === id);
    if (!anime) {
        anime = (await jikanAPI.getAnimeById(id)).data;
    }
    return anime;
}

export async function searchAnime(searchparams: AnimeSearchParams): Promise<JikanResponse<MyAnime[]>> {
    const response = (await jikanAPI.getAnimeSearch(searchparams)) as JikanResponse<MyAnime[]>;

    // Switch animes to saved versions where possible
    const list = await getList();
    response.data.forEach(a => a.saved = list.some(b => a.mal_id === b.mal_id));

    return response;
}
