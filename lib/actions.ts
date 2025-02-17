"use server";

import { Anime } from '@tutkli/jikan-ts';
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers';

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

export async function loginAction(formData: FormData) {
    const passkey = formData.get("passkey") as string;
    console.log("server action loginAction: " + passkey);
    (await cookies()).set("passkey", passkey);
}

export async function saveList(animeList: Anime[]): Promise<boolean> {
    const passkey = (await cookies()).get("passkey")?.value;
    console.log("saveList passkey: " + passkey);
    if (!passkey)
        return false;
    console.log("saveList animelist: ", animeList);
    const { error } = await supabase
        .from('user_anime_selections')
        .upsert({ user_passkey: passkey, anime_data: animeList });
    if (error) {
        console.error(error);
        return false;
    };
    return true;
}

export async function getList(): Promise<Anime[] | null> {
    const passkey = (await cookies()).get("passkey")?.value;
    console.log("getList passkey: " + passkey);
    if (!passkey)
        return null;
    const { data, error } = await supabase
        .from('user_anime_selections')
        .select('anime_data')
        .eq('user_passkey', passkey);
    if (error || data.length === 0) {
        console.log(error, data);
        return null;
    };
    return data[0].anime_data;
}