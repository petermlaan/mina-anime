"use server";

import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers';
import { loadAnimes, saveAnimes } from './db';
import { MyAnime } from './interfaces';
import { redirect } from 'next/navigation';

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

export async function loginAction(formData: FormData) {
    const passkey = formData.get("passkey") as string;
    (await cookies()).set("passkey", passkey);
    redirect("/");
}

export async function saveList(animeList: MyAnime[]): Promise<boolean> {
    const passkey = (await cookies()).get("passkey")?.value;
    if (!passkey)
        return false;
    await saveAnimes(passkey, animeList);
    return true;
}

export async function getList(): Promise<MyAnime[] | null> {
    const passkey = (await cookies()).get("passkey")?.value;
    if (!passkey)
        return null;
    return await loadAnimes(passkey);
}