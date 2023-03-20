import "../scss/_global.scss";
import "../scss/_movieContainer.scss";
import { useState } from "react";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const heartSolid = <FontAwesomeIcon icon={faHeartSolid} />;
const heartReg = <FontAwesomeIcon icon={faHeartReg} />;
const circleInfo = <FontAwesomeIcon icon={faCircleInfo} />;

const MovieContainer = ({ movie, selectMovie }) => {
  const [like, setLike] = useState(false);

  const { user } = useContext(AuthContextProvider);
  const movieId = doc(db, "users", `${user?.email}`);

  const saveMovie = async () => {
    if (user?.email) {
      setLike(true);
      await updateDoc(movieId, {
        savedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.poster_path,
        }),
      });
    } else {
      alert("Please sign in to save a movie");
    }
  };

  return (
    <li>
      {movie.poster_path ? (
        <div className="posterImage">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div onClick={() => selectMovie(movie)} className="posterOverlay">
          </div>
        </div>
      ) : (
        <p>No Image Available</p>
      )}
      <div className="infoAndLikeContainer">
        <p className="movieTitle">{movie.title}</p>
        <p onClick={saveMovie} className="likeIcon">
          {like ? heartSolid : heartReg}
        </p>
      </div>
    </li>
  );
};

export default MovieContainer;
