"use server";

import { auth } from '@clerk/nextjs/server';
import { dbLoadAnimes, dbSaveAnimes } from './db';
import { MyAnime } from './interfaces';

export async function saveAnimesSA(animes: MyAnime[]) {
    const { userId } = await auth();
    if (userId)
        dbSaveAnimes(userId, animes);
}

export async function getAnimesSA(): Promise<MyAnime[] | null> {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadAnimes(userId);
    if (!animes) {
        console.log("getAnimesSA no animes found");
        return null;
    }
    return animes;
}

/*export async function addAnimeSA(anime: MyAnime) {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadAnimes(userId);
    if (!animes) {
        console.log("addAnimeSA no animes found");
        return;
    }
    if (animes.find(a => a.mal_id === anime.mal_id)) {
        console.log("addAnimeSA anime already saved");
        return;
    }
    anime.saved = true;
    animes.unshift(anime);
    console.log("addAnimeSA saving...");
    dbSaveAnimes(userId, animes);
}*/

/*export async function removeAnimeSA(anime: MyAnime) {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadAnimes(userId);
    if (!animes) {
        console.log("removeAnimeSA found no animes");
        return;
    }
    const i = animes.findIndex(a => a.mal_id === anime.mal_id);
    if (i === -1) {
        console.log("removeAnimeSA anime not found in saved list");
        return;
    }
    animes.splice(i, 1);
    console.log("removeAnimeSA saving...");
    dbSaveAnimes(userId, animes);
}*/
