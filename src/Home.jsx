import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Hero from "./Hero";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { db } from "./Firebase";
import {collection, doc, onSnapshot, setDoc, deleteDoc} from 'firebase/firestore';

const Home = () => {
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
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  }

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=825c0871c8830f0ebc915791cc8d4f0f`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList(data.results);
      console.log(data.results);
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

  const bookmark = async (id, type, movieId) => {
    console.log(id, type, movieId);
    // const bookmarkList = [...bookmarked];
    // const checkBookmark = () => {
    //   let isBookmarked = false;
    //   bookmarkList.forEach((bookmark) => {
    //     if (bookmark.id === movieId) {
    //       isBookmarked = true;
    //     }
    //   });
    //   return isBookmarked;
    // };
    if (isAuthenticated) {
      // const checkIsBookmarked = checkBookmark();
      // !checkIsBookmarked
      //   ? setBookmarked((prev) => {
      //       return [
      //         ...prev,
      //         type === "movie"
      //           ? movieList[id]
      //           : type === "tv"
      //           ? tvList[id]
      //           : trendingList[id],
      //       ];
      //     })
      //   : toast.info('Already Bookmarked', toastConfig);
      if (type === "movie") {
        const docData = {
          title: movieList[id].title,
          poster_path: movieList[id].poster_path,
          release_date: movieList[id].release_date
        };
        const postRef = doc(db, user.nickname, docData.title);
          await setDoc(postRef, docData)
          console.log(docData.title, docData.poster_path, docData.release_date);
          toast.success('Bookmarked Successfully', toastConfig);
      }
      else if (type === "tv") {
        const docData = {
          title: tvList[id].original_name,
          poster_path: tvList[id].poster_path,
          release_date: tvList[id].first_air_date
        };
        const postRef = doc(db, user.nickname, docData.title);
          await setDoc(postRef, docData)
          console.log(docData.title, docData.poster_path, docData.release_date);
          toast.success('Bookmarked Successfully', toastConfig);
      }
      else {
        const docData = {
          title: trendingList[id].title,
          poster_path: trendingList[id].poster_path,
          release_date: trendingList[id].release_date
        };
        const postRef = doc(db, user.nickname, docData.title);
          await setDoc(postRef, docData)
          console.log(docData.title, docData.poster_path, docData.release_date);
          toast.success('Bookmarked Successfully', toastConfig);
      }
    } else {
      loginWithRedirect();
    }
    console.log(bookmarked);
  };

  const unbookmark = async (id, title) => {
    // const bookmarkList = [...bookmarked];
    // bookmarkList.splice(id, 1);
    // setBookmarked(bookmarkList);
    // console.log(id, bookmarked.length);
    await deleteDoc(doc(db, user.nickname, title));
    toast.success('Removed Successfully', toastConfig);
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
        setBookmarked(snapshot.docs.map((doc) => doc.data()))
      })
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
        <Hero
          title={heroBannerList.title}
          overview={heroBannerList.overview}
          poster={heroBannerList.poster_path}
        />
        {/* Popular Movies */}
        <div className="px-6 md:px-12 pt-6">
          <h2 className="font-semibold mb-4 text-2xl text-white">
            Popular Movies
          </h2>
          <div className="w-full flex space-x-10 overflow-x-auto slider">
            {movieList.map((list, id) => {
              return (
                <Card
                  bookmarkid={id}
                  {...list}
                  bookmark={bookmark}
                  type={"movie"}
                />
              );
            })}
          </div>
        </div>
        {/* Popular TV */}
        <div className="px-6 md:px-12 pt-6">
          <h2 className="font-semibold mb-4 text-2xl text-white">Popular TV</h2>
          <div className="w-full flex space-x-10 overflow-x-auto slider">
            {tvList.map((list, id) => {
              return (
                <Card
                  bookmarkid={id}
                  {...list}
                  bookmark={bookmark}
                  type={"tv"}
                />
              );
            })}
          </div>
        </div>
        {/* Bookmarked */}
        {bookmarked.length > 0 && isAuthenticated && (
          <div className="px-6 md:px-12 pt-6">
            <h2 className="font-semibold mb-4 text-2xl text-white">
              Bookmarked
            </h2>
            <div className="w-full flex space-x-10 overflow-x-auto slider">
              {bookmarked.length > 0 &&
                bookmarked.map((list, id) => {
                  return (
                    <Card
                      {...list}
                      bookmarkid={id}
                      unbookmark={unbookmark}
                      type={"bookmarked"}
                    />
                  );
                })}
            </div>
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
        </div>
        <ToastContainer />
      </div>
  );
};

export default Home;