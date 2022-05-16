import React from "react";

const Card = ({ id, title, overview, poster_path, release_date, bookmark }) => {
  return (
    <div key={id} className="w-56 relative flex-shrink-0">
      <button onClick={()=>bookmark(id)} className="bg-black bg-opacity-30 p-1.5 text-white rounded-full absolute right-2 top-2 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
      <figure className="movie_image relative overflow-hidden rounded-lg">
        <img
          className="w-full h-full"
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
          alt=""
        />
        <figcaption className="fig_caption absolute bg-white p-3 overflow-y-auto h-full">
          {overview}
        </figcaption>
      </figure>
      <div className="flex flex-col p-2 space-y-1">
        <p className="font-bold">{title}</p>
        <span>
          {release_date}
        </span>
      </div>
    </div>
  );
};

export default Card;
