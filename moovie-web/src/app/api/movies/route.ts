import { NextResponse } from 'next/server';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export async function GET() {
  try {
    if (!TMDB_API_KEY) throw new Error('TMDb API key not set');
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error('Failed to fetch latest movies');
    const data = await res.json();
    return NextResponse.json(data.results);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    if (!TMDB_API_KEY) throw new Error('TMDb API key not set');
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('Failed to search movies');
    const data = await res.json();
    return NextResponse.json(data.results);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

