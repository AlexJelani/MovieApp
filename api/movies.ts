

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTJjMjBiNTVhZjAzM2RkMjFlMzVmYjAyNjBkMDc4NCIsInN1YiI6IjYxOGI1MmJmY2Y2MmNkMDA2MTc1YWEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oo36hTqhhDJSZJ1rpr3RsODxBg3FmXycu9R3yIJvxOY'
}
export const fetchTopRatedMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
     headers
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  let json: any;
  json = await res.json();
  return json.results;
};
export const fetchMovie = async (id: number) => {

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  let json: any;
  json = await res.json();
  return json;
};
