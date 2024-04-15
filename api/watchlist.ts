export const addMovieToWatchlist = async (movieId: number) => {
  const url = 'https://api.themoviedb.org/3/account/null/watchlist';
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ media_type: 'movie', media_id: movieId, watchlist: true }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  const json = await res.json();
  return json;}