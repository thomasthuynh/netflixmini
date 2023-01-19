import './sass/Global.scss';
import './sass/App.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';
import MovieContainer from './MovieContainer';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const fetchMovies = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing",
    {
      params: {
        api_key: "02a015f767f49fbd46124014022d6a5c"
      }
    })

    setMovieData(response.data.results);
    setSelectedMovie(response.data.results[0]);
  }

  useEffect(() => {
    fetchMovies();
  }, [])

console.log(movieData);

  return (
    <div className="App">

    <header>
      <h1>Miniflix</h1>
    </header>

    <main>
      <section className="movieContent" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`}}>
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
