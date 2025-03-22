"use server";
import { Product } from '../interfaces';
import { dbSaveCart } from './db';

export async function saveCartAction(animes: Product[]) {
    dbSaveCart(animes);
}

/*export async function loadCartSA(): Promise<Product[] | null> {
    return await dbLoadCart();
}*/
