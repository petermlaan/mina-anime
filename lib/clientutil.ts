import SuperJSON from "superjson";
import { getAnimesSA, saveAnimesSA } from "./actions";
import { MyAnime } from "./interfaces";
import { AnimeClient, AnimeSearchParams, JikanResponse } from "@tutkli/jikan-ts";
import axios from "axios";

export async function getList(): Promise<MyAnime[]> {
    let animes = getListFromLS();
    if (animes === null) {
        animes = await getAnimesSA() ?? [];
        saveListToLS(animes);
    }
    return animes;
}

export function saveList() {
    const res = getListFromLS();
    if (res !== null)
        saveAnimesSA(res);
}

export async function getAnime(id: number, signal: AbortSignal): Promise<MyAnime> {
    const jikanAPI = new AnimeClient({
        enableLogging: true,
        axiosInstance: axios.create({signal: signal}),
    });
    let anime: MyAnime | undefined;
    const list = await getList();
    anime = list.find(a => a.mal_id === id);
    if (!anime) {
        anime = (await jikanAPI.getAnimeById(id)).data;
    }
    return anime;
}

export async function searchAnime(searchparams: AnimeSearchParams, signal: AbortSignal): Promise<JikanResponse<MyAnime[]>> {
    const jikanAPI = new AnimeClient({
        enableLogging: true,
        axiosInstance: axios.create({signal: signal}),
    });
    const response = (await jikanAPI.getAnimeSearch(searchparams)) as JikanResponse<MyAnime[]>;

    // Switch animes to saved versions
    const list = await getList();
    response.data.forEach(a => a.saved = list.some(b => a.mal_id === b.mal_id));

    return response;
}


export async function addAnime(anime: MyAnime) {
    anime.saved = true;
    const animes = await getList();
    animes.unshift(anime);
    saveListToLS(animes);
    saveAnimesSA(animes);
}

export async function removeAnime(anime: MyAnime) {
    const animes = await getList();
    const i = animes.findIndex(a => a.mal_id === anime.mal_id);
    if (i > -1) {
        animes.splice(i, 1);
        saveListToLS(animes);
        saveAnimesSA(animes);
    }
}

function getListFromLS(): MyAnime[] | null {
    if (!window || !localStorage)
        console.error("getListFromLS running on server!?");
    const list = localStorage.getItem("AnimeList");
    let json: MyAnime[] | null = null;
    if (list !== null) {
        json = SuperJSON.parse(list);
    }
    return json;
}

function saveListToLS(animes: MyAnime[]) {
    if (!window || !localStorage)
        throw new Error("saveListToLS should only be called on the client side");
    localStorage.setItem("AnimeList", SuperJSON.stringify(animes));
}
