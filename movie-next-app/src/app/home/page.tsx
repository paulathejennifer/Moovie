'use client';
import React, { useState, useEffect } from 'react';
import useMovieFetch, { Movie } from '../hooks/useFetchMovies';
import Footer from '../shared-component/Footer';
import NavBar from '../shared-component/NavBar';
import Image from 'next/image';

const MainPage: React.FC = () => {
  const { latestMovies, latestSeries, searchResults, loading, error, searchMovies } = useMovieFetch();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [favoriteList, setFavoriteList] = useState<Movie[]>([]);
  const [displayFavorites, setDisplayFavorites] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoriteList(savedFavorites);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) =>
        prev === Math.min(latestMovies.length, 5) - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, [latestMovies]);

  const toggleFavorite = async (movie: Movie) => {
    const isFavorite = favoriteList.some((fav) => fav.id === movie.id);
    const updatedFavorites = isFavorite
      ? favoriteList.filter((fav) => fav.id !== movie.id)
      : [...favoriteList, movie];

    setFavoriteList(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie, action: isFavorite ? 'remove' : 'add' }),
      });
    } catch (err) {
      console.error('Error syncing favorites:', err);
    }
  };

  const onSearch = (query: string) => {
    searchMovies(query);
  };

  const sortedMovies = [...latestMovies].sort(
    (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );
  const sortedSeries = [...latestSeries].sort(
    (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  if (loading) return <div className="text-center mt-20 text-white font-sans text-xl">Loading content...</div>;
  if (error) return <div className="text-center mt-20 text-red-400 font-sans text-xl">{error}</div>;

  return (
    <div className="bg-gray-950 min-h-screen w-full font-sans">
      <NavBar onSearch={onSearch} />
      <main className="w-full px-4 sm:px-8 lg:px-12 py-12">
        {searchResults.length > 0 ? (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-yellow-400 truncate">{item.title}</h3>
                    <p className="text-white text-sm mt-1">{new Date(item.release_date).getFullYear()}</p>
                    <button
                      onClick={() => toggleFavorite(item)}
                      className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        favoriteList.some((fav) => fav.id === item.id)
                          ? 'bg-white text-gray-900'
                          : 'border border-white text-white'
                      } hover:bg-white hover:text-gray-900`}
                    >
                      {favoriteList.some((fav) => fav.id === item.id) ? 'Remove Favorite' : 'Add to Favorites'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="relative h-[85vh] mb-16">
              {latestMovies.slice(0, 5).map((movie, index) => (
                <div
                  key={movie.id}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1200 ease-in-out ${
                    index === carouselIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }}
                >
                  <div className="bg-gradient-to-r from-gray-950/80 to-transparent h-full flex flex-col justify-center px-8 lg:px-16">
                    <span className="text-white text-lg">{new Date(movie.release_date).getFullYear()}</span>
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-6">{movie.title}</h1>
                    <p className="text-white max-w-lg lg:max-w-xl text-lg mb-8">{movie.overview}</p>
                    <div className="flex gap-6">
                      <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                        Watch Now
                      </button>
                      <button
                        onClick={() => toggleFavorite(movie)}
                        className={`px-8 py-3 rounded-lg font-semibold border border-yellow-400 ${
                          favoriteList.some((fav) => fav.id === movie.id)
                            ? 'bg-white text-gray-900'
                            : 'text-white'
                        } hover:bg-yellow-400 hover:text-gray-900 transition-colors`}
                      >
                        {favoriteList.some((fav) => fav.id === movie.id) ? 'Remove Favorite' : 'Add to Favorites'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
                {latestMovies.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === carouselIndex ? 'bg-white' : 'bg-gray-500'
                    } hover:bg-yellow-400`}
                  />
                ))}
              </div>
            </section>

            <section>
              <button
                onClick={() => setDisplayFavorites(!displayFavorites)}
                className="mb-8 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                {displayFavorites ? 'Show Latest Releases' : 'View My Favorites'}
              </button>

              {displayFavorites ? (
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400 mb-8">Your Favorites</h2>
                  {favoriteList.length === 0 ? (
                    <p className="text-yellow-400 text-lg">No favorites added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {favoriteList.map((item) => (
                        <div key={item.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title}
                            className="w-full h-72 object-cover"
                          />
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-yellow-400 truncate">{item.title}</h3>
                            <p className="text-yellow-400 text-sm mt-1">{new Date(item.release_date).getFullYear()}</p>
                            <button
                              onClick={() => toggleFavorite(item)}
                              className="mt-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                            >
                              Remove Favorite
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-yellow-400 mb-8">Latest Movies</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                    {sortedMovies.map((movie) => (
                      <div key={movie.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
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
                            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              favoriteList.some((fav) => fav.id === movie.id)
                                ? 'bg-yellow-400 text-gray-900'
                                : 'border border-yellow-400 text-yellow-400'
                            } hover:bg-yellow-500 hover:text-gray-900`}
                          >
                            {favoriteList.some((fav) => fav.id === movie.id) ? 'Remove Favorite' : 'Add to Favorites'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-3xl font-bold text-yellow-400 mb-8">Latest Series</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {sortedSeries.map((series) => (
                      <div key={series.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                          alt={series.title}
                          width={100}
                          height={100}
                          sizes='100vw'
                          className="w-full h-72 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-yellow-400 truncate">{series.title}</h3>
                          <p className="text-yellow-400 text-sm mt-1">{new Date(series.release_date).getFullYear()}</p>
                          <button
                            onClick={() => toggleFavorite(series)}
                            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              favoriteList.some((fav) => fav.id === series.id)
                                ? 'bg-yellow-400 text-gray-900'
                                : 'border border-yellow-400 text-yellow-400'
                            } hover:bg-yellow-500 hover:text-gray-900`}
                          >
                            {favoriteList.some((fav) => fav.id === series.id) ? 'Remove Favorite' : 'Add to Favorites'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
