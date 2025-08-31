
export async function fetchLatestMovies() {
  try {
    const response = await fetch('/api/movies?type=movie');
    if (!response.ok) throw new Error('Failed to fetch latest movies');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching latest movies: ${(error as Error).message}`);
  }
}

export async function fetchLatestSeries() {
  try {
    const response = await fetch('/api/movies?type=series');
    if (!response.ok) throw new Error('Failed to fetch latest series');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching latest series: ${(error as Error).message}`);
  }
}

export async function searchMovies(query: string) {
  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, type: 'movie' }),
    });
    if (!response.ok) throw new Error('Failed to search movies');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error searching movies: ${(error as Error).message}`);
  }
}