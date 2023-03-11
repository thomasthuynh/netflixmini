import { useState, useEffect } from "react";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import MovieContainer from "./MovieContainer";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContextProvider);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    })
  }, [user?.email])

  console.log(movies)

  return (
    <div>
        <ul className="movieList">
          {movies.map((movie, id) => {
            return (
              <li key={id}>
              {movie.img ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
                  alt={movie.title}
                />
              ) : (
                <p>No Image Available</p>
              )}
              <div className="overlay">
                <p className="posterTitle">{movie.title}</p>
              </div>
            </li>
            );
          })}
        </ul>
    </div>
  );
};

export default SavedMovies;
