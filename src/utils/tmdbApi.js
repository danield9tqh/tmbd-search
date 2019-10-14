import {api_key} from '../api_key';
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';

export const searchMovies = (query, page = 1) => {
  return fetch(`${baseUrl}/search/movie?api_key=${api_key}&query=${query}&page=${page}`).then(req => req.json());
}

let movieCache = {}
export const getMovie = (movieId) => {
  if(movieCache[movieId]) {
    return Promise.resolve(movieCache[movieId])
  } else {
    return fetch(`${baseUrl}/movie/${movieId}?api_key=${api_key}`).then(req => req.json()).then(movie => {
      movieCache[movieId] = movie
      return movie;
    });
  }
}

export const getMovieImagePath = (relativePath) => {
  return `${imageBaseUrl}${relativePath}`;
}

export const getFullMovieResults = ({results, total_pages, total_results, page}) => {
  return Promise.all(results.map(({id}) => {
    return getMovie(id);
  })).then(fullMovieResults => {
    const fullMovieResultsWithImagePaths = fullMovieResults.map(movie => {
      return {
        ...movie,
        full_poster_path: getMovieImagePath(movie.poster_path)
      }
    })
    return {results: fullMovieResultsWithImagePaths, total_pages, total_results, page};
  });
}

export const searchMoviesWithFullResults = (query, page = 1) => {
  return searchMovies(query, page).then(getFullMovieResults);
}
