import "../scss/_global.scss";
import "../scss/_home.scss";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import HomeNavBar from "./HomeNavBar";
import MovieContainer from "./MovieContainer";
import YouTube from "react-youtube";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const play = <FontAwesomeIcon icon={faPlay} />;
const star = <FontAwesomeIcon icon={faStar} />;
const xMark = <FontAwesomeIcon icon={faCircleXmark} />;

const Home = () => {
  // movieData will hold data for the top twenty trending movies
  const [movieData, setMovieData] = useState([]);
  // selectedMovie will hold the data (title, overview, background image, etc.) for the movie the user has selected
  const [selectedMovie, setSelectedMovie] = useState({});
  // searchValue will hold the user's search input
  const [searchValue, setSearchValue] = useState("");
  // trailer will hold the key value for the trailer video
  const [trailer, setTrailer] = useState("");
  // playVideo will determine whether the video player will be displayed or hidden
  const [playVideo, setPlayVideo] = useState(false);
  // isScrolled will determine whether the user has scrolled down from the top of the page
  const [isScrolled, setIsScrolled] = useState(false);
  // trailerOverlay will hold the class name for the home page overlay depending on whether a trailer is playing or not
  const [trailerOverlay, setTrailerOverlay] = useState("");

  // If the user has scrolled from the top of the page:
  // 1. isScrolled will be set to true
  // 2. isScrolled will be passed to the HomeNavBar component
  // 3. The nav bar will be set to a class of "homeNav scrolled", triggering the CSS property (background: #000) to activate
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
  };

   // The selectMovie function will be run when the user selects a movie and will:
  // 1. Close the trailer, if it was opened from a previous movie selection (setPlayVideo(false))
  // 2. Fetch the trailer (fetchTrailer)
  // 3. Fetch the movie data (title, overview, background image, etc.) and display it on the page (selectedMovie)
  // 4. The trailer overlay will be turned off, if opened from a previous movie selection
  // 5. The application will then scroll back to the top of the page
  const selectMovie = (movie) => {
    setPlayVideo(false);
    fetchTrailer(movie.id);
    setSelectedMovie(movie);
    setTrailerOverlay("trailerOverlay trailerOverlayOff");
    window.scrollTo(0, 0);
  };

  // The fetchMovies function will:
  // 1. Set the movieData state variable to the top twenty movies returned. If the user is searching for a specific movie, only the top ten results will be returned.
  // Note: If there are no results returned, (eg. the user enters an invalid search input), the alert will pop up
  // 2. Set the selectedMovie state variable to the first movie returned in the array
  // 3. The selectMovie function will run taking the first movie returned in the array as an argument
  const fetchMovies = async (searchValue) => {
    const lookupType = searchValue ? "search" : "discover";
    const response = await axios.get(
      `https://api.themoviedb.org/3/${lookupType}/movie`,
      {
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c",
          query: searchValue,
        },
      }
    );

    if (response.data.results.length > 0) {
      setMovieData(response.data.results);
      setSelectedMovie(response.data.results[0]);
      selectMovie(response.data.results[0]);

      if (lookupType === "search") {
        setMovieData(response.data.results.slice(0, 10));
        setSelectedMovie(response.data.results[0]);
        selectMovie(response.data.results[0]);
      }
    } else {
      alert(
        "Something went wrong. Please enter a valid movie title or try again later."
      );
    }
  };

  // The fetchTrailer function will:
  // 1. Retrieve the video data for the movies
  // 2. Search for a value titled "Official Trailer"/"official trailer". If found, trailerVideo will be assigned the value returned and set to the trailer state variable (setTrailer). If not found, it will be assigned the first property in the array will be assigned.
  const fetchTrailer = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c",
          append_to_response: "videos",
        },
      }
    );

    const trailerVideo = response.data.videos.results.find((video) => {
      return (
        video.name === "Official Trailer" || video.name === "official trailer"
      );
    });

    setTrailer(trailerVideo ? trailerVideo : response.data.videos.results[0]);
  };

  // The searchMovies function will be run when the user searches for a movie title and will trigger fetchMovies to run taking searchValue as a function argument
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchValue);
  };

  // The playTrailer function will play the movie trailer, if there is one available, and turn on the background overlay. Otherwise, the alert will be displayed
  const playTrailer = () => {
    if (trailer !== undefined) {
      setPlayVideo(true);
      setTrailerOverlay("trailerOverlay");
    } else {
      alert("Sorry, there is no trailer available for the selected movie.");
    }
  };

  // The closeTrailer function will close the trailer playing and turn off the background overlay
  const closeTrailer = () => {
    setPlayVideo(false);
    setTrailerOverlay("trailerOverlay trailerOverlayOff");
  };

  // This useEffect will run the loadTrendingMovies function on page load, displaying the top twenty trending movies
  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
      <HomeNavBar
        isScrolled={isScrolled}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fetchMovies={fetchMovies}
        searchMovies={searchMovies}
      />
      <header
        className="homeHeader"
        style={
          selectedMovie.backdrop_path
            ? {
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
              }
            : null
        }
      >
        <div className="movieContent">
          <div className="movieDetails">
            <h2 className="movieTitle">{selectedMovie.title}</h2>
            <p className="movieOverview">{selectedMovie.overview}</p>
            <p className="movieRating">
              <span className="starIcon">{star}</span>&nbsp;
              {selectedMovie.vote_average
                ? selectedMovie.vote_average.toFixed(1)
                : null}
            </p>
            <button className="watchTrailerButton" onClick={playTrailer}>
              {play}
              &nbsp; Watch Trailer
            </button>
          </div>

          {playVideo && (
            <div className="moviePlayer">
              <YouTube
                videoId={trailer.key}
                className="youtubePlayer"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
              <button className="closeTrailerButton" onClick={closeTrailer}>
                {xMark} &nbsp; Close
              </button>
            </div>
          )}
        </div>
        <div className={trailerOverlay}></div>
      </header>

      <section className="trendingMovies">
        <h2>Here's What's Trending</h2>

        <ul className="movieList">
          {movieData.map((movie) => {
            return (
              <MovieContainer
                key={movie.id}
                movie={movie}
                selectMovie={selectMovie}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Home;
