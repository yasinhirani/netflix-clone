import React from "react";
import { Link } from "react-router-dom";
// import YouTube from "react-youtube";

const Card = ({
  id,
  bookmarkid,
  title,
  overview,
  poster_path,
  release_date,
  type,
  isBookmarked,
  first_air_date,
  name,
  bookmark,
  unbookmark,
  getDetails,
  media_type,
  playVideo,
}) => {
  // const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      {poster_path && (
        <div key={bookmarkid}>
          <div className="w-32 xs:w-44 relative flex-shrink-0 hero">
            {isBookmarked !== "bookmarked" && (
              <button
                onClick={() => {
                  bookmark(bookmarkid, type, id);
                  // setBookmarked(true);
                }}
                className="bg-black bg-opacity-30 p-1 xs:p-1.5 text-white rounded-full absolute right-2 top-2 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[14px] xs:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            )}
            {isBookmarked === "bookmarked" && (
              <button
                className="bg-black bg-opacity-30 p-1 xs:p-1.5 text-white rounded-full absolute right-2 top-2 z-10"
                onClick={() => unbookmark(title)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-[14px] xs:w-4 transform rotate-45`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            )}
            {!isBookmarked && (
              <button
                className="bg-black bg-opacity-30 p-1 xs:p-1.5 text-white rounded-full absolute left-2 top-2 z-10"
                onClick={() => playVideo(title || name, type, id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[14px] xs:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            )}
            <figure className="movie_image w-full h-48 xs:h-64 relative overflow-hidden">
              <Link
                to={`/details/${type === "trending" ? media_type : type}/${id}`}
              >
                <img
                  className="w-full h-full rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt=""
                  loading="lazy"
                />
              </Link>
            </figure>
            <div className="flex flex-col p-2 space-y-1 text-white">
              <p className="font-bold line-clamp-1">{title || name}</p>
              <span>{release_date || first_air_date}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
