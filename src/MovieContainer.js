import './sass/Global.scss';
import './sass/MovieContainer.scss';

const MovieContainer = ({movie, selectMovie}) => {

    return (
        <li onClick={() => selectMovie(movie)}>
            {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /> 
            :
            <p>No Image Available</p>}
            <div className='overlay'>
                <p>{movie.title}</p>
            </div>
        </li>
    )
}

export default MovieContainer;