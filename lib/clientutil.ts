import SuperJSON from "superjson";
import { getAnimesSA, saveAnimesSA } from "./actions";
import { MyAnime } from "./interfaces";

export async function getList(): Promise<MyAnime[]> {
    console.log("getList start");
    let animes = getListFromLS();
    if (animes === null) {
        console.log("getList calling db...");
        animes = await getAnimesSA() ?? [];
        saveListToLS(animes);
    }
    console.log("getList animes:", animes);
    return animes;
}

export function saveList() {
    let res = getListFromLS();
    if (res !== null)
        saveAnimesSA(res);
}

export async function addAnime(anime: MyAnime) {
    let animes = await getList();
    animes.unshift(anime);
    saveListToLS(animes);
    saveAnimesSA(animes);
}

export async function removeAnime(anime: MyAnime) {
    let animes = await getList();
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
    console.log("getListFromLS list: ", list);
    let json: MyAnime[] | null = null;
    if (list !== null) {
        json = SuperJSON.parse(list);
    }
    console.log("getListFromLS json: ", json);
    return json;
}

function saveListToLS(animes: MyAnime[]) {
    if (!window || !localStorage)
        throw new Error("saveListToLS should only be called on the client side");
    localStorage.setItem("AnimeList", SuperJSON.stringify(animes));
}
