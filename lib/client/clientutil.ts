import SuperJSON from "superjson";
import { AnimeClient, AnimeSearchParams, JikanResponse } from "@tutkli/jikan-ts";
import { DEBOUNCE_DELAY } from "../constants";
import { MyAnime } from "../interfaces";
import { getAnimesSA, saveAnimesSA } from "../server/actions";

const jikanAPI = new AnimeClient({ enableLogging: true });

export async function getAnime(id: number): Promise<MyAnime> {
    const anime = (await jikanAPI.getAnimeById(id)).data as MyAnime;
    anime.myRating = 0;
    anime.saved = false;
    anime.watched = false;
    return anime;
}

export async function searchAnime(searchparams: AnimeSearchParams): Promise<JikanResponse<MyAnime[]>> {
    return (await jikanAPI.getAnimeSearch(searchparams)) as JikanResponse<MyAnime[]>;
}

export async function getList(): Promise<MyAnime[]> {
    console.count("getList");
    return await getAnimesSA() ?? [];
}

export function saveList(animes: MyAnime[]) {
    console.count("saveList");
    saveAnimesToDB(animes);
}

// ----- Debouncing DB writes -----
export let debounceTimeout = -1;

function saveAnimesToDB(animes: MyAnime[]) {
    if (!window) {
        console.error("SHOULD NOT HAPPEN! SaveAnimesToDB called from server.")
        saveAnimesSA(animes);
        return;
    }

    if (debounceTimeout > -1)
        window.clearTimeout(debounceTimeout);

    window.onbeforeunload = () => {
        navigator.sendBeacon("/api/save-animes", SuperJSON.stringify(animes));
    };

    debounceTimeout = window.setTimeout(() => {
        window.onbeforeunload = null;
        debounceTimeout = -1;
        console.count("saveAnimesToDB writing to DB");
        saveAnimesSA(animes);
    }, DEBOUNCE_DELAY);
}
