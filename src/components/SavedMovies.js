import "../scss/_global.scss";
import "../scss/_savedMovies.scss";
import { useState, useEffect } from "react";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const trashCan = <FontAwesomeIcon icon={faTrashCan} />;

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContextProvider);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteMovie = async (passedId) => {
    try {
      const result = movies.filter((item) => {
        return item.id !== passedId;
      });
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul className="movieList">
        {movies.map((movie, id) => {
          return (
            <li key={id}>
              {movie.img ? (
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
                    alt={movie.title}
                  />
                  <div className="posterOverlay"></div>
                </div>
              ) : (
                <p>No Image Available</p>
              )}
              <div className="infoAndDeleteContainer">
                <p className="movieTitle">{movie.title}</p>
                <p onClick={() => {
                  deleteMovie(movie.id)
                }} className="likeIcon">
                  {trashCan}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedMovies;
