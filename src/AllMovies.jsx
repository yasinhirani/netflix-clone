import React, { useEffect, useState } from "react";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "./Firebase";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";

const AllMovies = () => {
  const [movieList, setMovieList] = useState([]);
  const [dataLength, setdataLength] = useState(20);
  const [movieDataLength, seMovieDataLength] = useState(20);
  const [pageLength, setPageLength] = useState(2);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [mediatype, setMediaType] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const searchValue = debounce((value) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length > 0) {
      searchMovieResult(trimmedValue);
    }
    if (trimmedValue.length === 0) {
      setPageLength(2);
      getPopularMovies();
    }
  }, 750);

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.REACT_APP_MOVIE_DB_API_KEY
    }&sort_by=popularity.desc&certification_country=IN&with_original_language=hi&page=${1}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList(data.results);
      seMovieDataLength(data.total_results);
      console.log(data.results);
    } else {
      console.log("Some error");
    }
  };

  const fetchMore = async () => {
    setPageLength(pageLength + 1);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=popularity.desc&certification_country=IN&with_original_language=hi&page=${pageLength}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList((prev) => {
        return [...prev, ...data.results];
      });
      setdataLength(dataLength + 20);
      console.log(data);
    } else {
      console.log("Some error");
    }
  };

  const searchMovieResult = async (movieName) => {
    setMovieList([]);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&query=${movieName}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setMovieList(data.results);
      seMovieDataLength(data.results.length);
      console.log(data.results);
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
      } else {
        toast.info("Already Bookmarked", toastConfig);
      }
    } else {
      loginWithRedirect();
    }
    console.log(bookmarked);
  };

  const playVideo = (name, type) => {
    setYoutubeUrl("");
    // console.log(name, type);
    movieTrailer(name).then((url) => {
      setYoutubeUrl(url);
      setMediaType(type);
      setIsPlaying(true);
      // console.log(urlParams.get('v'));
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-grow overflow-y-auto" id="scrollableDiv">
      {isPlaying && (
        <button
          onClick={() => {
            setIsPlaying(false);
            setYoutubeUrl("");
          }}
          className="bg-black absolute inset-0 bg-opacity-50 z-20"
        ></button>
      )}
      <div className="px-6 md:px-12 py-6">
        <div className="flex flex-col xs:flex-row justify-between sm:items-center">
          <h2 className="font-semibold mb-4 text-2xl text-white">
            Popular Movies
          </h2>
          <div className="relative">
            <input
              className="search-input border border-white bg-transparent placeholder-white text-white outline-none px-2 py-2 text-sm rounded w-full xs:w-auto"
              autoComplete="off"
              type="text"
              name=""
              id="searchMovie"
              required
              onChange={(e) => searchValue(e.target.value)}
            />
            <label
              className="search-label text-white absolute top-1.5 left-3 transition-all"
              htmlFor="searchMovie"
            >
              search
            </label>
          </div>
        </div>
        <div className="w-full mt-5">
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            className="w-full grid grid-cols-sm sm:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-6 xs:gap-10 justify-center"
            dataLength={dataLength}
            loader={<></>}
            hasMore={movieDataLength > movieList.length}
            next={fetchMore}
          >
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
          </InfiniteScroll>
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
      <ToastContainer />
    </div>
  );
};
export default AllMovies;
