import React from "react";
// import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const Card = ({
  bookmarkid,
  title,
  overview,
  poster_path,
  release_date,
  bookmark,
}) => {
  // const [youtubeId, setYoutubeId] = useState('');
  // const [name, setName] = useState('');
  const getUrl = (e) => {
    movieTrailer(e).then(url => {
      // const urlParams = new URLSearchParams(new URL(url).search);
      // setYoutubeId(urlParams.get('v'));
      // const youtubeId = urlParams.get('v');
      console.log(url);
    });
  }
  // const opts = {
  //   height: '390',
  //   width: '100%',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };
  return (
    <div>
      <div key={bookmarkid} className="w-56 relative flex-shrink-0" onClick={() => getUrl(title)}>
        <button
          onClick={() => bookmark(bookmarkid)}
          className="bg-black bg-opacity-30 p-1.5 text-white rounded-full absolute right-2 top-2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4"
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
          {/* <figcaption className="fig_caption absolute bg-white p-3 overflow-y-auto h-full">
          {overview}
        </figcaption> */}
        </figure>
        <div className="flex flex-col p-2 space-y-1 text-white">
          <p className="font-bold">{title}</p>
          <span>{release_date}</span>
        </div>
      </div>
      {/* <YouTube videoId={youtubeId} opts={opts} /> */}
    </div>
  );
};

export default Card;
