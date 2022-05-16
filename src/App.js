import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);

  const getMovies = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=825c0871c8830f0ebc915791cc8d4f0f&sort_by=popularity.desc`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList(data.results);
      console.log(data.results);
    } else {
      console.log("Some error");
    }
  };

  const bookmark = (e) => {
    // console.log(e);
    setBookmarked((prev) => {
      return [...prev, movieList[e]];
    });
    console.log(bookmarked);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 shadow">
        <h1 className="text-2xl">Entertainment</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="outline-none focus:ring-0 px-2 py-1 rounded-md border border-gray-400"
            name="movie_name"
            id="movie_name"
            placeholder="Search..."
            autoComplete="off"
          />
          <button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div className="flex-grow overflow-y-auto px-6 md:px-12 py-6">
        {/* Featured */}
        <div>
          <h2 className="font-semibold mb-4 text-xl">Featured</h2>
          <div className="w-full flex space-x-10 overflow-x-auto">
            {movieList.map((list, id) => {
              return <Card id={id} {...list} bookmark={bookmark} />;
            })}
          </div>
        </div>
        {/* Free to watch */}
        <div className="mt-10">
          <h2 className="font-semibold mb-4 text-xl">Free to watch</h2>
          <div className="w-full flex space-x-10 overflow-x-auto">
            {movieList.map((list, id) => {
              return <Card id={id} {...list} bookmark={bookmark} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
