"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { dbLoadAnimes, dbSaveAnimes } from './db';
import { MyAnime } from './interfaces';
import { currentUser } from '@clerk/nextjs/server';

export async function saveListSA(animeList: MyAnime[]): Promise<boolean> {
    const user = await currentUser();
    console.log("saveListSA user: " + user);
    if (!user) {
        return false;
    }
    const passkey = user.id;
    if (!passkey)
        return false;
    await dbSaveAnimes(passkey, animeList);
    return true;
}

export async function getListSA(): Promise<MyAnime[] | null> {
    const user = await currentUser();
    console.log("getListSA user: " + user);
    if (!user) {
        return null;
    }
    const passkey = user.id;
    if (!passkey)
        return null;
    return await dbLoadAnimes(passkey);
}