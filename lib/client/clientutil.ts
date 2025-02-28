import SuperJSON from "superjson";
import { Anime, AnimeClient, AnimeSearchParams, JikanResponse } from "@tutkli/jikan-ts";
import { MyAnime } from "../interfaces";
import { getAnimesSA, saveAnimesSA } from "../server/actions";
import { DEBOUNCE_DB_DELAY } from "../constants";

const jikanAPI = new AnimeClient();

export async function getAnime(id: number): Promise<MyAnime> {
    const anime = (await jikanAPI.getAnimeById(id)).data;
    return MyAnimeFromAnime(anime);
}

export async function searchAnime(searchparams: AnimeSearchParams): Promise<JikanResponse<MyAnime[]>> {
    const res = (await jikanAPI.getAnimeSearch(searchparams));
    const myres: JikanResponse<MyAnime[]> = {
        pagination: res.pagination, 
        data: res.data.map(a => MyAnimeFromAnime(a))
    };
    return myres;
}

export async function getList(): Promise<MyAnime[]> {
    return await getAnimesSA() ?? [];
}

export function saveList(animes: MyAnime[]) {
    animes.forEach(a => {a.text = a.text.slice(0, 1000).trim();});
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
    window.addEventListener("beforeunload", onBeforeUnload, { signal: abortctrl.signal })

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

function MyAnimeFromAnime(anime: Anime): MyAnime {
    const myAnime: MyAnime = {
        // New properties
        myRating: 0,
        saved: false,
        watched: false,
        text: "",

        source: anime.source || "",
        episodes: anime.episodes || 0,
        status: anime.status || "",
        scored_by: anime.scored_by || 0,
        rank: anime.rank || 0,
        popularity: anime.popularity || 0,
        favorites: anime.favorites || 0,
        synopsis: anime.synopsis || "",
        background: anime.background || "",
        themes: anime.themes.map(t => t.name),
        mal_id: anime.mal_id,
        year: anime.year || 0,
        type: anime.type || "",
        genres: anime.genres?.map(g => g.name) || [],
        score: anime.score || 0,

        // Changed properties
        yturl: anime.trailer.url,
        title_english: anime.title_english || anime.title || "<missing>",
        title: anime.title || anime.title_english || "<missing>",
        poster:
            anime.images.jpg.maximum_image_url ||
            anime.images.webp?.maximum_image_url ||
            anime.images.jpg.large_image_url ||
            anime.images.webp?.large_image_url ||
            anime.images.jpg.image_url ||
            anime.images.webp?.image_url ||
            process.env.ANIME_POSTER_FALLBACK ||
            "/favicon.jpg",

    };
    return myAnime;
}