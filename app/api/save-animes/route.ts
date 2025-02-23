import { MyAnime } from '@/lib/interfaces';
import { saveAnimesSA } from '@/lib/server/actions';
import { NextRequest, NextResponse } from 'next/server';
import SuperJSON from 'superjson';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const animes = SuperJSON.parse(body) as MyAnime[];
    await saveAnimesSA(animes);
    return NextResponse.json({ success: true }, { status: 200 });
}
