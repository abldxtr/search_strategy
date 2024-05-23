import { revalidatePath } from "next/cache";
import { Movie } from "@/movie-data";
import MoviesList from "@/components/movies-list";
import SearchServerActions from "@/components/search-server-action";
import { db } from "@/lib/db";
import { cache } from "react";

var movies: Movie[] = [];
const Data = cache(async () => {
  const item: Movie[] = await db.movie.findMany();
  return item;
});
// const filter = cache(async (title: string) => {
//   const item: Movie[] | null = await db.Movie.findMany({
//     where: {
//       title: {
//         contains: title,
//         mode: "insensitive",
//       },
//     },
//   });
// });
export default async function Home() {
  const initialMoviesData = await Data();
  // movies = initialMoviesData;
  console.log("initialMoviesData", initialMoviesData.length);
  const searchHandler = async (searchQuery: string) => {
    "use server";
    console.log("searchHandler", searchQuery);

    const filteredMoviesData = await db.movie.findMany({
      where: searchQuery
        ? {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          }
        : {}, // Empty object means no filtering when search is empty
    });
    movies = filteredMoviesData;
    revalidatePath("server-actions");
  };
  const deactivateSearch = async () => {
    "use server";
    movies = initialMoviesData;
    revalidatePath("server-actions");
  };

  return (
    <div>
      <SearchServerActions
        deactivateSearch={deactivateSearch}
        searchHandler={searchHandler}
      />
      {/* Movies */}
      <MoviesList movies={movies} />
    </div>
  );
}
