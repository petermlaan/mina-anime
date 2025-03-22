"use server";
import { Product } from '../interfaces';
import { dbLoadCart, dbSaveCart } from './db';

export async function saveCartSA(animes: Product[]) {
    dbSaveCart(animes);
}

export async function loadCartSA(): Promise<Product[] | null> {
    return await dbLoadCart();
}
