"use server";
import { auth } from '@clerk/nextjs/server';
import { dbLoadCart, dbSaveCart } from './db';
import { Product } from '../interfaces';

export async function saveCartSA(animes: Product[]) {
    const { userId } = await auth();
    if (userId)
        dbSaveCart(userId, animes);
}

export async function loadCartSA(): Promise<Product[] | null> {
    const { userId } = await auth();
    if (!userId)
        return null;
    const animes = await dbLoadCart(userId);
    if (!animes)
        return null;
    return animes;
}
