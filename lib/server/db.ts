import "server-only"
import { createClient } from "@supabase/supabase-js"
import { MyAnime } from "../interfaces"

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "")

export async function dbLoadAnimes(passkey: string): Promise<MyAnime[] | null> {
    const { data, error } = await supabase
        .from("user_anime_selections")
        .select("anime_data")
        .eq("user_passkey", passkey)
    if (error) {
        console.error("loadAnimes", error)
        throw error
    }
    if (!data || data.length === 0)
        return null
    return data[0].anime_data
}

export async function dbSaveAnimes(passkey: string, animes: MyAnime[]) {
    console.count("dbSaveAnimes")
    const { error } = await supabase
        .from('user_anime_selections')
        .upsert({ user_passkey: passkey, anime_data: animes })
    if (error) {
        console.error("saveAnimes", error)
        throw error
    }
}
