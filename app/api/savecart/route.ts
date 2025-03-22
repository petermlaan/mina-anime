import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/interfaces';
import SuperJSON from 'superjson';
import { dbSaveCart } from '@/lib/server/db';

export async function POST(request: NextRequest) {
    console.log("api savecart");
    const body = await request.text();
    const products = SuperJSON.parse(body) as Product[];
    dbSaveCart(products);
    return NextResponse.json({ success: true }, { status: 200 });
}
