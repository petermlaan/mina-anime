import SuperJSON from "superjson";
import { AnimeClient, AnimeSearchParams, JikanResponse } from "@tutkli/jikan-ts";
import { MyAnime } from "../interfaces";
import { getAnimesSA, saveAnimesSA } from "../server/actions";
import { DEBOUNCE_DB_DELAY } from "../constants";

const jikanAPI = new AnimeClient();

export async function getAnime(id: number): Promise<MyAnime> {
    const anime = (await jikanAPI.getAnimeById(id)).data as MyAnime;
    setDefaultValues(anime);
    return anime;
}

export async function searchAnime(searchparams: AnimeSearchParams): Promise<JikanResponse<MyAnime[]>> {
    const res = (await jikanAPI.getAnimeSearch(searchparams)) as JikanResponse<MyAnime[]>;
    res.data.forEach(a => setDefaultValues(a));
    return res;
}

export async function getList(): Promise<MyAnime[]> {
    return await getAnimesSA() ?? [];
}

export function saveList(animes: MyAnime[]) {
    saveAnimesToDB(animes);
}

// ----- Debouncing DB writes -----
let debounceDBTimeout = -1;
const abortctrl = new AbortController();

function saveAnimesToDB(animes: MyAnime[]) {
    if (!window) {
        console.error("SHOULD NOT HAPPEN! SaveAnimesToDB called from server.")
        saveAnimesSA(animes);
        return;
    }

    if (debounceDBTimeout > -1) {
        window.clearTimeout(debounceDBTimeout);
        abortctrl.abort();
    }

    const onBeforeUnload = () => {
        navigator.sendBeacon("/api/save-animes", SuperJSON.stringify(animes));
    };
    window.addEventListener("beforeunload", onBeforeUnload, { signal: abortctrl.signal})

    debounceDBTimeout = window.setTimeout(() => {
        abortctrl.abort();
        debounceDBTimeout = -1;
        console.count("saveAnimesToDB writing to DB");
        saveAnimesSA(animes);
    }, DEBOUNCE_DB_DELAY);
}

// ----- Generic debounce function -----
let debounceTimeout = -1;

export function debounce(delay: number, fn: () => void) {
    if (debounceTimeout > -1) {
        window.clearTimeout(debounceTimeout);
        window.removeEventListener("beforeunload", fn);
    }

    window.addEventListener("beforeunload", fn);
    debounceTimeout = window.setTimeout(() => {
        window.removeEventListener("beforeunload", fn);
        debounceTimeout = -1;
        fn();
    }, delay);
}

function setDefaultValues(anime: MyAnime) {
    // Set the new properties in case the axios cache has been contaminated
    anime.myRating = 0;
    anime.saved = false;
    anime.watched = false;
    anime.text = "";
 
    // Fix some properties coming from the API
    anime.title_english = anime.title_english || anime.title;
    anime.title = anime.title || anime.title_english;
    anime.score = anime.score || 0;
    anime.poster =
        anime.images.jpg.maximum_image_url ||
        anime.images.webp?.maximum_image_url ||
        anime.images.jpg.large_image_url ||
        anime.images.webp?.large_image_url ||
        anime.images.jpg.image_url ||
        anime.images.webp?.image_url ||
        process.env.ANIME_POSTER_FALLBACK ||
        "/favicon.jpg";
}