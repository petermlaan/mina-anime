import "server-only";
import { createClient } from '@supabase/supabase-js'
import { Product } from '../interfaces';
import { auth } from "@clerk/nextjs/server";

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

export async function dbLoadCart(): Promise<Product[] | null> {
    console.log("dbLoadCart");
    const { userId } = await auth();
    if (!userId) {
        console.error("dbLoadCart: no userId");
        return null;
    }
    const { data, error } = await supabase
        .from("cart")
        .select("products")
        .eq("user_passkey", userId);
    if (error) {
        console.error("dbLoadCart", error);
        throw error;
    };
    if (!data || data.length === 0)
        return null;
    return data[0].products;
}

export async function dbSaveCart(products: Product[]) {
    console.log("dbSaveCart");
    const { userId } = await auth();
    if (!userId) {
        console.error("dbSaveCart: no userId");
        throw new Error("No userId");
    }
    const { error } = await supabase
        .from('cart')
        .upsert({ user_passkey: userId, products });
    if (error) {
        console.error("dbSaveCart", error);
        throw error;
    };
}
