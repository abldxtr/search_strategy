"use client";

import { useEffect, useState, useTransition, useLayoutEffect } from "react";

import { Input } from "@/components/ui/input";
import ClipLoader from "react-spinners/ClipLoader";

const SearchServerActions = ({
  searchHandler,
  deactivateSearch,
}: {
  searchHandler: (searchQuery: string) => Promise<void>;
  deactivateSearch: () => Promise<void>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const submitHandler = () => {
    startTransition(() => {
      searchHandler(inputValue);
    });
  };

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log("change", e.target.value);
    setInputValue(e.target.value);
    // console.log("inputValue", inputValue);
    if (e.target.value.length === 0) {
      startTransition(() => {
        deactivateSearch();
      });
    }
  }

  useEffect(() => {
    if (inputValue.length === 0) {
      deactivateSearch();
    }
  }, [inputValue]);

  // useLayoutEffect(() => {
  //   searchHandler("");
  // }, []);

  return (
    <form action={submitHandler} className="relative mt-8 mb-5">
      <Input
        value={inputValue}
        onChange={change}
        placeholder="Search movies"
        className="text-base"
      />
      {isPending && (
        <div className="absolute top-2 right-2">
          <ClipLoader
            color="gray"
            size={18}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </form>
  );
};

export default SearchServerActions;
