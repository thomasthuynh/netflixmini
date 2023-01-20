import './sass/Global.scss';
import './sass/App.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import MovieContainer from './MovieContainer';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const fetchMovies = async (searchValue) => {
    const lookupType = searchValue ? "search" : "discover";
    const response = await axios.get(`https://api.themoviedb.org/3/${lookupType}/movie/`,
    {
      params: {
        api_key: "02a015f767f49fbd46124014022d6a5c",
        query: searchValue
      }
    })

    setMovieData(response.data.results);
    setSelectedMovie(response.data.results[0]);
  }

  useEffect(() => {
    fetchMovies();
  }, [])


  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchValue);
  }

  console.log(movieData);

  return (
    <div className="App">

    <header>
      <h1>Miniflix</h1>

      <form onSubmit={searchMovies}>
        <input type="text" onChange={e => setSearchValue(e.target.value)}/>
        <button>Search</button>
      </form>

      <p>{searchValue}</p>
    </header>

    <main>
      <section className="movieContent" style={selectedMovie.backdrop_path ? {backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(255, 255, 255, 0.25)), url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`} : null}>
        <div className="movieDetails">
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
        </div>
      </section>

      <section>
        <ul className="movieList">
            {movieData.map((movie) => {
              return(
                <MovieContainer 
                  key={movie.id}
                  movie={movie}
                  setSelectedMovie={setSelectedMovie}
                />
              )
            })}
          </ul>
      </section>
    </main>



    </div>
  );
}

export default App;
