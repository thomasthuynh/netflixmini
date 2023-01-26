import './sass/Global.scss';
import './sass/App.scss';
import axios from 'axios';
import YouTube from 'react-youtube';
import {useState, useEffect} from 'react';
import MovieContainer from './MovieContainer';

function App() {

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


  // This function will:
  // 1. Set the movieData state variable to the top twenty movies returned based off the user's search 
  // 2. Set the selectedMovie state variable to the first movie returned in the array
  // 3. The selectMovie function will run taking the first movie returned in the array as an argument
  const fetchMovies = async (searchValue) => {
    const lookupType = searchValue ? "search" : "discover";
    const response = await axios.get(
      `https://api.themoviedb.org/3/${lookupType}/movie/`,
      {
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c",
          query: searchValue,
        },
      }
    );

    setMovieData(response.data.results);
    setSelectedMovie(response.data.results[0]);

    selectMovie(response.data.results[0])
  };

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
        return video.name === "Official Trailer" || video.name === "official trailer";
      });

      setTrailer(trailerVideo ? trailerVideo : response.data.videos.results[0]);
  };


  // This function will be run when the user selects a movie and will:
  // 1. Close the trailer, if it was opened from a previous movie selection (setPlayVideo(false))
  // 2. Fetch the trailer (fetchTrailer) 
  // 3. Fetch the movie data (title, overview, background image, etc.) and display it on the page (selectedMovie)
  // 4. The application will then scroll back to the top of the page
  const selectMovie = (movie) => {
    setPlayVideo(false);
    fetchTrailer(movie.id);
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  // This function will be run when the user searches for a movie title and will trigger fetchMovies to run taking searchValue as a function argument
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchValue);
  }

  // This useEffect will run the fetchMovies function on page load
  useEffect(() => {
    fetchMovies();
  }, [])


  return (
    <div className="App">
      <header
        style={
          selectedMovie.backdrop_path
            ? {
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.90), rgba(255, 255, 255, 0.25)), url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
              }
            : null
        }
      >
        <nav>
          <h1>Miniflix</h1>

          <form onSubmit={searchMovies}>
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button>Search</button>
          </form>
        </nav>

        <div className="movieContent">
          <div className="movieDetails">
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
            <button className="watchTrailer" onClick={() => setPlayVideo(true)}>
              Watch Trailer
            </button>
          </div>


            {playVideo ? (
              <div className="moviePlayer">
                <YouTube
                  videoId={trailer.key}
                  className="youtubePlayer"
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                      autoplay: 1
                    }
                  }}
                />
                <button
                  className="closeTrailer"
                  onClick={() => setPlayVideo(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <div></div>
            )}

        </div>
      </header>

      <section>
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
}

export default App;
