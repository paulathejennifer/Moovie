'use client';
import React, { useState, useEffect } from 'react';
import Footer from '../shared-component/Footer';
import NavBar from '../shared-component/NavBar';
import { Movie } from '../hooks/useFetchMovies';

const FavoritesPage: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState<Movie[]>([]);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoriteList(savedFavorites);
    }
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favoriteList.some((fav) => fav.id === movie.id);
    const updatedFavorites = isFavorite
      ? favoriteList.filter((fav) => fav.id !== movie.id)
      : [...favoriteList, movie];
    setFavoriteList(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-gray-950 min-h-screen w-full font-sans text-white">
      <NavBar onSearch={() => {}} />
      <main className="px-4 sm:px-8 lg:px-12 py-12">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">Your Favorites</h2>
        {favoriteList.length === 0 ? (
          <p className="text-yellow-400 text-lg">No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {favoriteList.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-yellow-400 truncate">{movie.title}</h3>
                  <p className="text-yellow-400 text-sm mt-1">{new Date(movie.release_date).getFullYear()}</p>
                  <button
                    onClick={() => toggleFavorite(movie)}
                    className="mt-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
