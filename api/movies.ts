export const fetchTopRatedMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTJjMjBiNTVhZjAzM2RkMjFlMzVmYjAyNjBkMDc4NCIsInN1YiI6IjYxOGI1MmJmY2Y2MmNkMDA2MTc1YWEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oo36hTqhhDJSZJ1rpr3RsODxBg3FmXycu9R3yIJvxOY'
    }
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error(error);
  }

};
