import { Movie } from "@/movie-data";

import { siteConfig } from "@/site";
// import { supabaseClient } from "@/lib/utils"
import MoviesList from "@/components/movies-list";
import PageHero from "@/components/page-hero";
import SearchServerParams from "@/components/search-server-params";
import { db } from "@/lib/db";

const Page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const searchQuery = searchParams.search ?? "";

  let movies: Movie[] = [];

  // Get Initial Data
  const initialMoviesData = await db.Movie.findMany();

  // Search Function
  const filteredMoviesData = await db.Movie.findMany({
    where: {
      title: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
  });

  // If there is a search query, set movies to search results
  if (searchQuery.length > 0) {
    // If there is a result, set movies to result
    if (filteredMoviesData) {
      movies = filteredMoviesData;
    }
    // If there is no result, set movies to empty array
    else {
      movies = [];
    }
  }
  // If there is no search query, set movies to initial data
  else {
    movies = initialMoviesData ?? [];
  }

  return (
    <div>
      <SearchServerParams />
      {/* Producs */}
      <MoviesList movies={movies} />
    </div>
  );
};

export default Page;
