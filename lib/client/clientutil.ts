import { getAnimesSA, saveAnimesSA } from "../server/actions";
import { MyAnime } from "../interfaces";
import { getListFromStorage, saveListToStorage } from "./clientstorage";

export async function getList(): Promise<MyAnime[]> {
    let animes = getListFromStorage();
    if (animes === null) {
        animes = await getAnimesSA() ?? [];
        saveListToStorage(animes);
    }
    return animes;
}

export function saveList() {
//    const delay = 5000; // Debounce delay in ms

    console.count("saveList");
/*    useEffect(() => {
        const handler = setTimeout(() => {
            console.count("saveList timer");
            const res = getListFromStorage();
            if (res !== null)
                saveAnimesSA(res);
        }, delay);

        return () => {
            console.count("saveList cleanup");
            clearTimeout(handler);
        };
    });*/
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

