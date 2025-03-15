import SuperJSON from "superjson";
import { Product, APISearchResult } from "../interfaces";
import { DEBOUNCE_DB_DELAY } from "../constants";
import { getAnimesSA, saveAnimesSA } from "../server/actions";
import { fetchJSON } from "../util";

export async function getProduct(id: number, myProducts: Product[]): Promise<Product> {
    let a = myProducts.find(a => a.id === id) ?? null;
    if (!a) {
        a = await fetchJSON("https://dummyjson.com/products/" + id) as Product;
        a.amount = 0;
    }
    console.log("getProduct: ", a);
    
    return a;
}

export async function getProductsByCategory(category: string): Promise<APISearchResult> {
    const json = await fetchJSON("https://dummyjson.com/products/category/" + category) as APISearchResult;
    json.products.forEach(p => p.amount = 0);
    return json;
}

export async function searchProducts(query: string, page: number = 1): Promise<APISearchResult> {
    const json = await fetchJSON("https://dummyjson.com/products/search?q=" + query + "&skip=" + (page-1)*30) as APISearchResult;
    json.products.forEach(p => p.amount = 0);
    return json;
}

export async function getCategoryList(): Promise<string[]> {
    const json = await fetchJSON("https://dummyjson.com/products/category-list", true) as string[];
    return json;
}

export async function getList(): Promise<Product[]> {
    return await getAnimesSA() ?? [];
}

export function saveList(animes: Product[]) {
    saveAnimesToDB(animes);
}

// ----- Debouncing DB writes -----
let debounceDBTimeout = -1;
const abortctrl = new AbortController();

function saveAnimesToDB(animes: Product[]) {
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
        saveAnimesSA(animes);
    }, DEBOUNCE_DB_DELAY);
}

// ----- Generic debounce function -----
let debounceTimeout = -1;

export function debounce(delay: number, fn: () => void) {
    if (!window) {
        console.error("SHOULD NOT HAPPEN! SaveAnimesToDB called from server.")
        fn();
        return;
    }

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

/* function toMyAnime(anime: Anime): MyAnime {
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
} */