import "../scss/_global.scss";
import "../scss/_savedMovies.scss";
import { useState, useEffect } from "react";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const trashCan = <FontAwesomeIcon icon={faTrashCan} />;

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContextProvider);

  // In movieRef:
  // "doc" is a Firebase Firestore function which is used to create a reference to a specific document in the database
  // "db" is a variable that represents the Firestore database
  // "users" is a string that specifies the name of the Firestore colllection containing the referenced document
  // "user?.email" is a string that specifies the ID of the Firestore document referenced
  const movieRef = doc(db, "users", `${user?.email}`);

  // "onSnapshot" is a Firebase method which sets up a real time listener that triggers a callback function everytime data in the movieRef collection changes
  // The callback function passed to "onSnapshot" retrieves movie data from "doc" using the "data()" method and updates the movies state variable (setMovies)
  useEffect(() => {
    onSnapshot(movieRef, (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email], movieRef);

  const deleteMovie = async (passedId) => {
    try {
      const result = movies.filter((item) => {
        return item.id !== passedId;
      });
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <ul className="savedMovieList">
        {movies.map((movie, id) => {
          return (
            <li key={id}>
              {movie.img ? (
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
                    alt={movie.title}
                  />
                </div>
              ) : (
                <p>No Image Available</p>
              )}
              <div className="infoAndDeleteContainer">
                <p className="movieTitle">{movie.title}</p>
                <p
                  onClick={() => {
                    deleteMovie(movie.id);
                  }}
                  className="trashIcon"
                >
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
