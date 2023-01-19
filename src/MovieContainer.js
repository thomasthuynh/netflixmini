import './sass/Global.scss';
import './sass/MovieContainer.scss';

const MovieContainer = ({movie}) => {
    return(
        <li>
            {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /> 
            :
            <p>No Image Available</p>}
            <p>{movie.title}</p>
        </li>
    )
}

export default MovieContainer;