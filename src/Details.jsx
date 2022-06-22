import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from './ProfileCard';

const Details = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);

  const getDetails = async () => {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setDetails(data);
      // console.log(data, type);
    } else {
      console.log("Some error");
    }
  };

  const getSimilarMovies = async () => {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setCast(data.cast);
      console.log(data);
    } else {
      console.log("Some error");
    }
  };

  const {
    poster_path,
    title,
    tagline,
    overview,
    release_date,
    runtime,
    vote_average,
    first_air_date,
    name,
    episode_run_time,
  } = details;

  const hours = Math.floor((runtime || (episode_run_time && episode_run_time[0])) / 60);
  const minutes = (runtime || (episode_run_time && episode_run_time[0])) % 60;

  useEffect(() => {
    getDetails();
    getSimilarMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-grow overflow-y-auto">
      <div className="px-6 md:px-12 py-6 w-full xl:w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start space-x-0 md:space-x-20 space-y-10 md:space-y-0">
          <figure className="w-full md:w-[500px] rounded-md shadow-xl overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
              alt=""
            />
          </figure>
          <div className="text-white">
            <div className="flex flex-col space-y-4">
              <h1 className="text-6xl">{title || name}</h1>
              <p>{tagline}</p>
              <p className="flex items-center space-x-4">
                <span>{`${vote_average}`}</span> <span>/</span>
                <span>{`${hours > 0 ? hours+"h" : ''} ${minutes}m`}</span>
                <span>/</span>
                <span>{release_date || first_air_date}</span>
              </p>
            </div>
            <div className="mt-10">
              <p className="text-xl">Overview:</p>
              <p>{overview}</p>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <h2 className="font-semibold mb-4 text-2xl text-white">
            Cast
          </h2>
          <div className="w-full flex space-x-10 overflow-x-auto slider">
            {cast.map((list, id) => {
              return (
                <ProfileCard
                  {...list}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
