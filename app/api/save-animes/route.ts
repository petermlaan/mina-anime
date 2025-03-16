import { Product } from '@/lib/interfaces';
import { saveCartSA } from '@/lib/server/actions';
import { NextRequest, NextResponse } from 'next/server';
import SuperJSON from 'superjson';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const products = SuperJSON.parse(body) as Product[];
    saveCartSA(products);
    return NextResponse.json({ success: true }, { status: 200 });
}
