import SuperJSON from "superjson";
import { getAnimesSA, saveAnimesSA } from "./actions";
import { MyAnime } from "./interfaces";
import { AnimeClient, AnimeSearchParams, JikanResponse } from "@tutkli/jikan-ts";

const jikanAPI = new AnimeClient({enableLogging: true});

export async function getList(): Promise<MyAnime[]> {
    let animes = getListFromStorage();
    if (animes === null) {
        animes = await getAnimesSA() ?? [];
        saveListToStorage(animes);
    }
    return animes;
}

export function saveList() {
    const res = getListFromStorage();
    if (res !== null)
        saveAnimesSA(res);
}

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

    // Switch animes to saved versions
    const list = await getList();
    response.data.forEach(a => a.saved = list.some(b => a.mal_id === b.mal_id));

    return response;
}

export async function addAnime(anime: MyAnime) {
    anime.saved = true;
    const animes = await getList();
    animes.unshift(anime);
    saveListToStorage(animes);
    saveAnimesSA(animes);
}

export async function removeAnime(anime: MyAnime) {
    const animes = await getList();
    const i = animes.findIndex(a => a.mal_id === anime.mal_id);
    if (i > -1) {
        animes.splice(i, 1);
        saveListToStorage(animes);
        saveAnimesSA(animes);
    }
}

function getListFromStorage(): MyAnime[] | null {
    const storage = getStorage();
    if (!window || !storage)
        console.error("getListFromLS running on server!?");
    const list = storage.getItem("AnimeList");
    let json: MyAnime[] | null = null;
    if (list !== null) {
        json = SuperJSON.parse(list);
    }
    return json;
}

function saveListToStorage(animes: MyAnime[]) {
    const storage = getStorage();
    if (!window || !storage)
        throw new Error("saveListToLS should only be called on the client side");
    storage.setItem("AnimeList", SuperJSON.stringify(animes));
}

function getStorage() : Storage {
    return sessionStorage;    
}