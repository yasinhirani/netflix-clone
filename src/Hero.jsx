import React from "react";
import { PlayIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Hero = ({ id, title, overview, poster, playVideo }) => {
  return (
    <header
      className={`h-[90%] w-full bg-contain bg-no-repeat relative hero`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 1)",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-white font-bold text-2xl md:text-5xl hero__title">{title}</h1>
        <p className="w-full md:w-[60ch] line-clamp-3 text-white mt-4 text-xl hero__overview">
          {overview}
        </p>
        <div className="mt-4 flex items-center space-x-8">
          <button
            className="bg-white rounded w-32 p-2 flex justify-center items-center space-x-2"
            onClick={() => playVideo(title, "movie", id)}
          >
            <PlayIcon className="w-5"></PlayIcon>
            <span>Play</span>
          </button>
          <Link to={`details/movie/${id}`}>
            <button className="bg-gray-700 bg-opacity-80 text-white rounded w-32 p-2 flex justify-center items-center space-x-2">
              <InformationCircleIcon className="w-5"></InformationCircleIcon>
              <span>More Info</span>
            </button>
          </Link>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "8rem",
          backgroundImage:
            "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.21), #111)",
        }}
      ></div>
    </header>
  );
};

export default Hero;
