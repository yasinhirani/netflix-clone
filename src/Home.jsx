import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Hero from "./Hero";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./Firebase";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [heroBannerList, setHeroBannerList] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [mediatype, setMediaType] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
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
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=popularity.desc&certification_country=IN&with_original_language=hi&page=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList(data.results);
      console.log(data);
      let randomMovie = Math.floor(Math.random() * data.results.length - 1);
      setHeroBannerList(
        data.results[randomMovie]
      );
      // console.log(
      //   data.results[Math.floor(Math.random() * data.results.length - 1)]
      // );
    } else {
      console.log("Some error");
    }
  };
  const getPopularTv = async () => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=popularity.desc&certification_country=IN&with_original_language=hi`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setTvList(data.results);
      console.log(data);
    } else {
      console.log("Some error");
    }
  };

  const getTrendingMovies = async (day) => {
    const url = `https://api.themoviedb.org/3/trending/movie/${day}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setTrendingList(data.results);
      // console.log(data.results);
    } else {
      console.log("Some error");
    }
  };

  const bookmark = async (id, type, movieId) => {
    console.log(id, type, movieId);
    // Checks if user is authenticated
    if (isAuthenticated) {
      const bookmarkList = [...bookmarked];
      // Function to check if show is already bookmarked
      const checkBookmark = () => {
        let isBookmarked = false;
        bookmarkList.forEach((bookmark) => {
          if (bookmark.id === movieId) {
            isBookmarked = true;
          }
        });
        return isBookmarked;
      };
      const checkIsBookmarked = checkBookmark();
      if (!checkIsBookmarked) {
        if (type === "movie") {
          const docData = {
            id: movieList[id].id,
            title: movieList[id].title,
            poster_path: movieList[id].poster_path,
            release_date: movieList[id].release_date,
            type: "movie",
          };
          const postRef = doc(db, user.nickname, docData.title);
          await setDoc(postRef, docData);
          // console.log(docData.title, docData.poster_path, docData.release_date);
          toast.success("Bookmarked Successfully", toastConfig);
        } else if (type === "tv") {
          const docData = {
            id: tvList[id].id,
            title: tvList[id].name,
            poster_path: tvList[id].poster_path,
            release_date: tvList[id].first_air_date,
            type: "tv",
          };
          const postRef = doc(db, user.nickname, docData.title);
          await setDoc(postRef, docData);
          // console.log(docData.title, docData.poster_path, docData.release_date);
          toast.success("Bookmarked Successfully", toastConfig);
        } else {
          const docData = {
            id: trendingList[id].id,
            title: trendingList[id].title,
            poster_path: trendingList[id].poster_path,
            release_date: trendingList[id].release_date,
            type: trendingList[id].media_type,
          };
          const postRef = doc(db, user.nickname, docData.title);
          await setDoc(postRef, docData);
          // console.log(docData.title, docData.poster_path, docData.release_date);
          toast.success("Bookmarked Successfully", toastConfig);
        }
      } else {
        toast.info("Already Bookmarked", toastConfig);
      }
    } else {
      loginWithRedirect();
    }
    console.log(bookmarked);
  };

  const unbookmark = async (title) => {
    await deleteDoc(doc(db, user.nickname, title));
    toast.success("Removed Successfully", toastConfig);
  };

  const playVideo = async (name, type, id) => {
    setYoutubeUrl("");
    if (type === "tv") {
      const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        console.log(data.results[0]);
        if (!data.results[0]) {
          toast.error("Video not found", toastConfig);
        } else {
          setYoutubeUrl(data.results[0].key);
          setMediaType(type);
          setIsPlaying(true);
        }
      } else {
        console.log("Some error");
      }
    } else {
      movieTrailer(name).then((url) => {
        if (url) {
          setYoutubeUrl(url);
          setMediaType(type);
          setIsPlaying(true);
        } else {
          toast.error("Video not found", toastConfig);
          setIsPlaying(false);
        }
      });
    }
  };

  const handleTabClick = (tabindex, tabname) => {
    setTabIndex(tabindex);
    setTrendingList([]);
    setTimeout(() => {
      tabname.toLowerCase() === "today"
        ? getTrendingMovies("day")
        : getTrendingMovies("week");
    }, 2000);
  };
  useEffect(() => {
    if (isAuthenticated) {
      onSnapshot(collection(db, user.nickname), (snapshot) => {
        setBookmarked(snapshot.docs.map((doc) => doc.data()));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    getPopularMovies();
    getPopularTv();
    getTrendingMovies("day");
  }, []);

  return (
    <div className="flex-grow overflow-y-auto">
      {/* Hero */}
      {isPlaying && (
        <button
          onClick={() => {
            setIsPlaying(false);
            setYoutubeUrl("");
          }}
          className="bg-black absolute inset-0 bg-opacity-50 z-20"
        ></button>
      )}
      <Hero
        id={heroBannerList.id}
        title={heroBannerList.title}
        overview={heroBannerList.overview}
        poster={heroBannerList.backdrop_path}
        playVideo={playVideo}
      />
      {/* Popular Movies */}
      <div className="px-6 md:px-12 pt-6">
        <div className="flex justify-between items-center text-white">
          <h2 className="font-semibold mb-4 text-2xl">Popular Movies</h2>
          <Link to={"/allMovies"}>see all</Link>
        </div>
        <div className="w-full flex space-x-10 overflow-x-auto slider">
          {movieList.map((list, id) => {
            return (
              <Card
                bookmarkid={id}
                {...list}
                bookmark={bookmark}
                type={"movie"}
                playVideo={playVideo}
              />
            );
          })}
        </div>
        {youtubeUrl && mediatype === "movie" && (
          <ReactPlayer
            className="player"
            url={`https://www.youtube.com/watch?v=${youtubeUrl}`}
            width={"92%"}
            height={"500px"}
            controls={true}
            onEnded={() => setYoutubeUrl("")}
          />
        )}
      </div>
      {/* Popular TV */}
      <div className="px-6 md:px-12 pt-6">
        <div className="flex justify-between items-center text-white">
          <h2 className="font-semibold mb-4 text-2xl">Popular Tv</h2>
          <Link to={"/allTv"}>see all</Link>
        </div>
        <div className="w-full flex space-x-10 overflow-x-auto slider">
          {tvList.map((list, id) => {
            return (
              <Card
                bookmarkid={id}
                {...list}
                bookmark={bookmark}
                type={"tv"}
                playVideo={playVideo}
              />
            );
          })}
        </div>
        {youtubeUrl && mediatype === "tv" && (
          <ReactPlayer
            className="player"
            url={`https://www.youtube.com/watch?v=${youtubeUrl}`}
            width={"92%"}
            height={"500px"}
            controls={true}
            onEnded={() => setYoutubeUrl("")}
          />
        )}
      </div>
      {/* Bookmarked */}
      {bookmarked.length > 0 && isAuthenticated && (
        <div className="px-6 md:px-12 pt-6">
          <h2 className="font-semibold mb-4 text-2xl text-white">Bookmarked</h2>
          <div className="w-full flex space-x-10 overflow-x-auto slider">
            {bookmarked.length > 0 &&
              bookmarked.map((list, id) => {
                return (
                  <Card
                    {...list}
                    bookmarkid={id}
                    unbookmark={unbookmark}
                    isBookmarked={"bookmarked"}
                    playVideo={playVideo}
                  />
                );
              })}
          </div>
          {youtubeUrl && mediatype === "bookmarked" && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${youtubeUrl}`}
              width={"100%"}
              height={"500px"}
              controls={true}
              onEnded={() => setYoutubeUrl("")}
            />
          )}
        </div>
      )}
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
                  onClick={() => handleTabClick(tab.index, tab.name)}
                  className={`${
                    tab.index === tabIndex && "bg-white text-black"
                  } rounded-2xl px-4 py-1 border-0 outline-none`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
        {trendingList && trendingList.length > 0 ? (
          <div className="w-full flex space-x-10 overflow-x-auto slider">
            {trendingList.map((list, id) => {
              return (
                <Card
                  bookmarkid={id}
                  {...list}
                  bookmark={bookmark}
                  type={"trending"}
                  playVideo={playVideo}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-80 flex justify-center items-center">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {youtubeUrl && mediatype === "trending" && (
          <ReactPlayer
            className="player"
            url={`https://www.youtube.com/watch?v=${youtubeUrl}`}
            width={"92%"}
            height={"500px"}
            controls={true}
            onEnded={() => setYoutubeUrl("")}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
