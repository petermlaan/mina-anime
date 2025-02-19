"use server";

import { auth } from '@clerk/nextjs/server';
import { DB_TAGS_SAVEDANIMES, dbLoadAnimes, dbSaveAnimes } from './db';
import { MyAnime } from './interfaces';
import { revalidatePath, revalidateTag } from 'next/cache';

/* export async function saveListSA(animeList: MyAnime[]): Promise<boolean> {
    const { userId } = await auth();
    if (!userId)
        return false;
    dbSaveAnimes(userId, animeList);
    return true;
}
 */

/* export async function getListSA(): Promise<MyAnime[] | null> {
    const { userId } = await auth();
    if (!userId)
        return null;
    return await dbLoadAnimes(userId);
}
 */

export async function addAnimeSA(anime: MyAnime) {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadAnimes(userId);
    if (!animes)
        return;
    if (animes.find(a => a.mal_id === anime.mal_id))
        return;
    anime.saved = true;
    animes.unshift(anime);
    dbSaveAnimes(userId, animes);
    revalidateTag(DB_TAGS_SAVEDANIMES);
}

export async function removeAnimeSA(anime: MyAnime) {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadAnimes(userId);
    if (!animes)
        return;
    const i = animes.findIndex(a => a.mal_id === anime.mal_id);
    if (i === -1)
        return;
    animes.splice(i, 1);
    dbSaveAnimes(userId, animes);
    revalidateTag(DB_TAGS_SAVEDANIMES);
}
