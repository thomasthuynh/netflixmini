import './sass/Global.scss';
import './sass/App.scss';
import axios from 'axios';
import YouTube from 'react-youtube';
import {useState, useEffect} from 'react';
import MovieContainer from './MovieContainer';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [trailer, setTrailer] = useState("");
  const [playVideo, setPlayVideo] = useState(false);

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


  const selectMovie = (movie) => {
    fetchTrailer(movie.id);
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchValue);
  }

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
            <button className='trailerButton' onClick={() => setPlayVideo(true)}>Watch Trailer</button>
          </div>

          <div className='moviePlayer'>
            <YouTube 
              videoId={trailer.key}
            />
          </div>

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
