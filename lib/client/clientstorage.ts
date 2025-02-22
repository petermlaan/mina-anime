import SuperJSON from "superjson";
import { MyAnime } from "../interfaces";

export function getListFromStorage(): MyAnime[] | null {
    if (!window || !sessionStorage)
        console.error("getListFromLS running on server!?");
    const list = sessionStorage.getItem("AnimeList");
    let json: MyAnime[] | null = null;
    if (list !== null) {
        json = SuperJSON.parse(list);
    }
    return json;
}

export function saveListToStorage(animes: MyAnime[]) {
    if (!window || !sessionStorage)
        throw new Error("saveListToLS should only be called on the client side");
    sessionStorage.setItem("AnimeList", SuperJSON.stringify(animes));
}
