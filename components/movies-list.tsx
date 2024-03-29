// "use client"

import { Movie } from "@/movie-data";

import MovieItem from "./movie-item";

const MoviesList = ({
  movies,
  isHandling = false,
}: {
  movies: Movie[];
  isHandling?: boolean;
}) => {
  console.log("moviesList", movies.length);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {!isHandling ? (
        movies.length > 0 &&
        movies?.map((movie) => <MovieItem key={movie.id} movie={movie} />)
      ) : (
        <div>Searching...</div>
      )}
    </div>
  );
};

export default MoviesList;
