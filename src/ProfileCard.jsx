import React from "react";

const Card = ({ name, original_name, profile_path }) => {
  // const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      {profile_path && name && (
        <div key={Math.random()}>
          <div className="w-44 relative flex-shrink-0 hero">
            <figure className="movie_image w-full h-64 relative overflow-hidden">
              <img
                className="w-full h-full rounded-lg text-white"
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt={name || original_name}
                loading="lazy"
              />
            </figure>
            <div className="flex flex-col p-2 space-y-1 text-white">
              <p className="font-bold">{name || original_name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
