import { MyAnime } from "./interfaces";

export async function getListFromLS(): Promise<MyAnime[] | null> {
    if (!window || !localStorage)
        throw new Error("idbGetList should only be called on the client side");
    const list = localStorage.getItem("AnimeList");
    if (!list)
        return null;
    return JSON.parse(list);
}

export async function saveListToLS(animes: MyAnime[]) {
    if (!window || !localStorage)
        throw new Error("saveListToLS should only be called on the client side");
    localStorage.setItem("AnimeList", JSON.stringify(animes));
}
