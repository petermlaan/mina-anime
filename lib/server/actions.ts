"use server";

import { auth } from '@clerk/nextjs/server';
import { dbLoadAnimes, dbSaveAnimes } from './db';
import { Product } from '../interfaces';

export async function saveAnimesSA(animes: Product[]) {
    const { userId } = await auth();
    if (userId)
        dbSaveAnimes(userId, animes);
}

export async function getAnimesSA(): Promise<Product[] | null> {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadAnimes(userId);
    if (!animes)
        return null;
    return animes;
}
