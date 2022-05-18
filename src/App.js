import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Hero from "./Hero";
import Navbar from "./Navbar";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [heroBannerList, setHeroBannerList] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  const tabs = [
    {
      index: 1,
      name: "Today",
    },
    {
      index: 2,
      name: "This Week",
    },
  ];

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=825c0871c8830f0ebc915791cc8d4f0f`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList(data.results);
      setHeroBannerList(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      console.log(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    } else {
      console.log("Some error");
    }
  };
  const getPopularTv = async () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=825c0871c8830f0ebc915791cc8d4f0f`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setTvList(data.results);
    } else {
      console.log("Some error");
    }
  };

  const getTrendingMovies = async (day) => {
    const url = `https://api.themoviedb.org/3/trending/movie/${day}?api_key=825c0871c8830f0ebc915791cc8d4f0f`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setTrendingList(data.results);
      console.log(data.results);
    } else {
      console.log("Some error");
    }
  };

  const bookmark = (e) => {
    console.log(e);
    setBookmarked((prev) => {
      return [...prev, movieList[e]];
    });
    console.log(bookmarked);
  };

  const handleClick = (tabindex, tabname) => {
    setTabIndex(tabindex);
    tabname.toLowerCase() === 'today' ? getTrendingMovies('day') : getTrendingMovies('week')
  }

  useEffect(() => {
    getPopularMovies();
    getPopularTv();
    getTrendingMovies('day');
  }, []);

  return (
    <div className="bg-[#111] h-full flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-grow overflow-y-auto">
        {/* Hero */}
        <Hero
          title={heroBannerList.title}
          overview={heroBannerList.overview}
          poster={heroBannerList.poster_path}
        />
        {/* Popular Movies */}
        <div className="px-6 md:px-12 pt-6">
          <h2 className="font-semibold mb-4 text-2xl text-white">Popular Movies</h2>
          <div className="w-full flex space-x-10 overflow-x-auto">
            {movieList.map((list, id) => {
              return <Card bookmarkid={id} {...list} bookmark={bookmark} />;
            })}
          </div>
        </div>
        {/* Popular TV */}
        <div className="px-6 md:px-12 pt-6">
          <h2 className="font-semibold mb-4 text-2xl text-white">Popular TV</h2>
          <div className="w-full flex space-x-10 overflow-x-auto">
            {tvList.map((list, id) => {
              return <Card bookmarkid={id} {...list} bookmark={bookmark} />;
            })}
          </div>
        </div>
        {/* Trending */}
        <div className="mt-10 px-6 md:px-12 pb-6">
          <div className="flex items-center space-x-6 mb-6">
            <h2 className="font-semibold text-xl text-white">Trending</h2>
            <div className="text-white border border-white rounded-2xl">
              {tabs.map((tab, i) => {
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleClick(tab.index, tab.name)}
                    className={`${
                      tab.index === tabIndex && "bg-white text-black"
                    } rounded-2xl px-4 py-1`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-full flex space-x-10 overflow-x-auto">
            {trendingList.map((list, id) => {
              return <Card bookmarkid={id} {...list} bookmark={bookmark} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
