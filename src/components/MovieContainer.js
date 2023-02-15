import '../scss/_global.scss';
import '../scss/_movieContainer.scss';
import { useState } from 'react';

// Font imports
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';

const heartSolid = <FontAwesomeIcon icon={faHeartSolid} />
const heartReg = <FontAwesomeIcon icon={faHeartReg} />

const MovieContainer = ({movie, selectMovie}) => {

    const [like, setLike] = useState(false);

    return (
      <li onClick={() => selectMovie(movie)}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <p>No Image Available</p>
        )}
        <div className="overlay">
          <p className="posterTitle">{movie.title}</p>
          <p className="likeIcon">{like ? heartSolid : heartReg}</p>
        </div>
      </li>
    );
}

export default MovieContainer;