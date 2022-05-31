import React from "react";

const Hero = ({ title, overview, poster }) => {
  return (
    <header
      className={`h-[90%] w-full bg-contain bg-no-repeat relative hero`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: 'rgba(0, 0, 0, 1)'
      }}
    >
      <div className="w-full h-full flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-white font-bold text-2xl md:text-5xl">{title}</h1>
        <p className="w-full md:w-[60ch] line-clamp-3 text-white mt-4 text-xl">{overview}</p>
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
