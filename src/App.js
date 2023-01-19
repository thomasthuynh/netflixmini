import './sass/App.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {

  const [movieData, setMovieData] = useState([])

  const fetchMovies = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing",
    {
      params: {
        api_key: "02a015f767f49fbd46124014022d6a5c"
      }
    })

    setMovieData(response.data.results);
  }

  useEffect(() => {
    fetchMovies();
  }, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
