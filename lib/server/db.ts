import "server-only";

import { createClient } from '@supabase/supabase-js'
import { Product } from '../interfaces';

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

export async function dbLoadAnimes(passkey: string): Promise<Product[] | null> {
    const { data, error } = await supabase
        .from("cart")
        .select("products")
        .eq("user_passkey", passkey);
    if (error) {
        console.error("loadAnimes", error);
        throw error;
    };
    if (!data || data.length === 0)
        return null;
    return data[0].products;
}

export async function dbSaveAnimes(passkey: string, products: Product[]) {
    console.count("dbSaveAnimes");
    const { error } = await supabase
        .from('cart')
        .upsert({ user_passkey: passkey, products });
    if (error) {
        console.error("saveAnimes", error);
        throw error;
    };
}
