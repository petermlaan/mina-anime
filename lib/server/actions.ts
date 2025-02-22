"use server";

import { auth } from '@clerk/nextjs/server';
import { dbLoadAnimes, dbSaveAnimes } from './db';
import { MyAnime } from '../interfaces';

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
    if (!animes)
        return null;
    return animes;
}
