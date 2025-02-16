import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/db'

export async function POST(request: Request) {
    const { passkey, animeData } = await request.json();
    const { data, error } = await supabase
        .from('user_anime_selections')
        .upsert({ user_passkey: passkey, anime_data: animeData })
    
    if (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const passkey = searchParams.get('passkey');
    
    const { data, error } = await supabase
        .from('user_anime_selections')
        .select('anime_data')
        .eq('user_passkey', passkey);
    
    if (error) 
        return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}