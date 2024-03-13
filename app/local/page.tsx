"use client";

import { MOVIE_DATA, Movie } from "@/movie-data";
import { useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import MoviesList from "@/components/movies-list";
import { siteConfig } from "@/site";

const Page = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [state, setstate] = useState<Boolean>(false);

  const [initialList] = useState(MOVIE_DATA);
  const [filteredList, setFilteredList] = useState(MOVIE_DATA);

  // Search Handler
  // function search(list: string[], chars: string) {
  //   // console.log(list,chars.length)
  //   var res_one = [];

  //   for (let item of list) {
  //     for (var ii = 0; ii < chars.length; ii++) {
  //       if (item.charAt(ii) === chars.charAt(ii)) {
  //         if (ii + 1 === chars.length) {
  //           res_one.push(item);
  //         }
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  //   return [...new Set(res_one)];
  // }

  const searchHandler = useCallback(() => {
    const filteredData = initialList.filter((movie) => {
      return movie.title.toLowerCase().includes(inputValue.toLowerCase());
    });

    // let rusult = filteredData.map((item, i) => initialList.filter((it)=>item === it.title)).flat;

    setFilteredList(filteredData);
    setstate(false);
  }, [initialList, inputValue]);

  // EFFECT: Search Handler
  useEffect(() => {
    if (inputValue.trim().length > 0) {
      setstate(true);
    } else {
      setstate(false);
    }
    // Debounce search handler
    const timer = setTimeout(() => {
      searchHandler();
    }, 500);

    // Cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [searchHandler, inputValue]);

  return (
    <>
      <div className="container mx-auto">
        <div className="relative mt-8 mb-5 w-full">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            placeholder="Search movies"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {state && (
            <div className="absolute top-3 right-2">
              <ClipLoader
                color="gray"
                size={18}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
        {/* Producs */}
        <MoviesList
          movies={inputValue.length > 0 ? filteredList : initialList}
        />
      </div>
    </>
  );
};

export default Page;
