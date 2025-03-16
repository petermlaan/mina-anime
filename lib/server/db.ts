import "server-only";
import { createClient } from '@supabase/supabase-js'
import { Product } from '../interfaces';

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

export async function dbLoadCart(passkey: string): Promise<Product[] | null> {
    console.log("dbLoadCart");
    const { data, error } = await supabase
        .from("cart")
        .select("products")
        .eq("user_passkey", passkey);
    if (error) {
        console.error("dbLoadCart", error);
        throw error;
    };
    if (!data || data.length === 0)
        return null;
    return data[0].products;
}

export async function dbSaveCart(passkey: string, products: Product[]) {
    console.log("dbSaveCart");
    const { error } = await supabase
        .from('cart')
        .upsert({ user_passkey: passkey, products });
    if (error) {
        console.error("dbSaveCart", error);
        throw error;
    };
}
