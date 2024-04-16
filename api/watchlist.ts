export const fetchWatchListMovies = async () => {
  const url =
    'https://api.themoviedb.org/3/account/11402796/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTJjMjBiNTVhZjAzM2RkMjFlMzVmYjAyNjBkMDc4NCIsInN1YiI6IjYxOGI1MmJmY2Y2MmNkMDA2MTc1YWEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oo36hTqhhDJSZJ1rpr3RsODxBg3FmXycu9R3yIJvxOY',
    },
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  const json = await res.json();
  return json.results;
};

export const addMovieToWatchList = async (movieId: number) => {
  const url = 'https://api.themoviedb.org/3/account/11402796/watchlist';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTJjMjBiNTVhZjAzM2RkMjFlMzVmYjAyNjBkMDc4NCIsInN1YiI6IjYxOGI1MmJmY2Y2MmNkMDA2MTc1YWEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oo36hTqhhDJSZJ1rpr3RsODxBg3FmXycu9R3yIJvxOY'
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      watchlist: true,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return await res.json();
};
