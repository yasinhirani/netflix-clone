import React, { useEffect, useState } from "react";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "./Firebase";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPlayer from "react-player";

const AllTv = () => {
  const [tvList, setTvList] = useState([]);
  const [dataLength, setdataLength] = useState(20);
  const [tvDataLength, seTvDataLength] = useState(20);
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

  const getPopularTv = async () => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${
      process.env.REACT_APP_MOVIE_DB_API_KEY
    }&sort_by=popularity.desc&certification_country=IN&with_original_language=hi&page=${1}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setTvList(data.results);
      seTvDataLength(data.total_results);
      console.log(data.results);
    } else {
      console.log("Some error");
    }
  };

  const fetchMore = async () => {
    setPageLength(pageLength + 1);
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=popularity.desc&certification_country=IN&with_original_language=hi&page=${pageLength}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setTvList((prev) => {
        return [...prev, ...data.results];
      });
      setdataLength(dataLength + 20);
      console.log(data);
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
        toast.info("Already Bookmarked", toastConfig);
      }
    } else {
      loginWithRedirect();
    }
    console.log(bookmarked);
  };

  const playVideo = async (name, type, id) => {
    console.log(id);
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      console.log(data.results[0]);
      setYoutubeUrl(data.results[0].key);
      setMediaType(type);
      setIsPlaying(true);
    } else {
      console.log("Some error");
    }
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
    getPopularTv();
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
      <div className="px-6 md:px-12 pt-6">
        <h2 className="font-semibold mb-4 text-2xl text-white">
          Popular Movies
        </h2>
        <div className="w-full">
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            className="w-full grid grid-cols-sm sm:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl gap-6 xs:gap-10 justify-center"
            dataLength={dataLength}
            loader={<></>}
            hasMore={tvDataLength > tvList.length}
            next={fetchMore}
          >
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
          </InfiniteScroll>
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
      <ToastContainer />
    </div>
  );
};
export default AllTv;
