"use server";

import { cookies } from 'next/headers';
import { dbLoadAnimes, dbSaveAnimes } from './db';
import { MyAnime } from './interfaces';
import { redirect } from 'next/navigation';

export async function loginSA(formData: FormData) {
    const passkey = formData.get("passkey") as string;
    (await cookies()).set("passkey", passkey);
    redirect("/");
}

export async function saveListSA(animeList: MyAnime[]): Promise<boolean> {
    const passkey = (await cookies()).get("passkey")?.value;
    if (!passkey)
        return false;
    await dbSaveAnimes(passkey, animeList);
    return true;
}

export async function getListSA(): Promise<MyAnime[] | null> {
    const passkey = (await cookies()).get("passkey")?.value;
    if (!passkey)
        return null;
    return await dbLoadAnimes(passkey);
}