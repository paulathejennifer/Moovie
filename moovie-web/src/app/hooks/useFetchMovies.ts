
"use client";
import { useState, useEffect } from 'react';
import { fetchLatestMovies, fetchLatestSeries, searchMovies } from '../utils/fetchMovies';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const useMovieFetch = () => {
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [latestSeries, setLatestSeries] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        const [movies, series] = await Promise.all([fetchLatestMovies(), fetchLatestSeries()]);
        setLatestMovies(movies);
        setLatestSeries(series);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getContent();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { latestMovies, latestSeries, searchResults, loading, error, searchMovies: handleSearch };
};

export default useMovieFetch;