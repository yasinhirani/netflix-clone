import React from "react";
// import YouTube from "react-youtube";

const Card = ({
  id,
  bookmarkid,
  title,
  overview,
  poster_path,
  release_date,
  type,
  first_air_date,
  original_name,
  bookmark,
  unbookmark,
}) => {
  // const [bookmarked, setBookmarked] = useState(false);
  return (
    <div>
      <div key={bookmarkid} className="w-56 relative flex-shrink-0 hero">
        {type !== 'bookmarked' && (
          <button
            onClick={() => {
              bookmark(bookmarkid, type, id);
              // setBookmarked(true);
            }}
            className="bg-black bg-opacity-30 p-1.5 text-white rounded-full absolute right-2 top-2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4"
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
        {type === 'bookmarked' && (
          <button className="bg-black bg-opacity-30 p-1.5 text-white rounded-full absolute right-2 top-2 z-10" onClick={()=>unbookmark(bookmarkid, title)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 transform rotate-45`}
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
        <figure className="movie_image relative overflow-hidden rounded-lg">
          <img
            className="w-full h-full"
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
            alt=""
          />
        </figure>
        <div className="flex flex-col p-2 space-y-1 text-white">
          <p className="font-bold">{title || original_name}</p>
          <span>{release_date || first_air_date}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
