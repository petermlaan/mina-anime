import { MyAnime } from "../interfaces";
import { getAnimesSA, saveAnimesSA } from "../server/actions";
import { getListFromStorage, saveListToStorage } from "./clientstorage";

export async function getList(): Promise<MyAnime[]> {
    let animes = getListFromStorage();
    if (animes === null) {
        animes = await getAnimesSA() ?? [];
        saveListToStorage(animes);
    }
    return animes;
}

export async function updateAndSaveList(anime: MyAnime) {
    const res = await getList();
    if (res) {
        const i = res.findIndex(a => a.mal_id === anime.mal_id);
        if (i > -1) {
            res[i] = anime;
            saveListToStorage(res);
            saveAnimesSA(res);
        }
    }
}

export function toggleSaved(anime: MyAnime) {
    anime.saved = !anime.saved;
    if (anime.saved) {
        anime.watched = false;
        anime.myRating = 0;
        addAnime(anime);
    } else
        removeAnime(anime);
}

async function addAnime(anime: MyAnime) {
    const animes = await getList();
    animes.unshift(anime);
    saveListToStorage(animes);
    saveAnimesSA(animes);
}

async function removeAnime(anime: MyAnime) {
    const animes = await getList();
    const i = animes.findIndex(a => a.mal_id === anime.mal_id);
    if (i > -1) {
        animes.splice(i, 1);
        saveListToStorage(animes);
        saveAnimesSA(animes);
    }
}
