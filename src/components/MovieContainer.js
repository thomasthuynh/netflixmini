import "../scss/_global.scss";
import "../scss/_movieContainer.scss";
import { useState } from "react";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";

const heartSolid = <FontAwesomeIcon icon={faHeartSolid} />;
const heartReg = <FontAwesomeIcon icon={faHeartReg} />;

const MovieContainer = ({ movie, selectMovie }) => {
  // like will store a booleon of whether the user has favourited a movie or not
  const [like, setLike] = useState(false);

  const { user } = useContext(AuthContextProvider);

  // In movieRef:
  // "doc" is a Firebase Firestore function which is used to create a reference to a specific document in the database
  // "db" is a variable that represents the Firestore database
  // "users" is a string that specifies the name of the Firestore colllection containing the referenced document
  // "user?.email" is a string that specifies the ID of the Firestore document referenced
  const movieRef = doc(db, "users", `${user?.email}`);

  // The saveMovie function will:
  // Check if there is a user,
  // - If there is (if the user is signed in), will check if there is a user email (which there should be if the user is properly signed in)
  //- If there is a user email, then the like state variable will be set to true, and the favourited movie will be added as an item in the savedMovies array
  // - If there is not (the user is not signed in), will run the alert

  const saveMovie = async () => {
    if (user?.email) {
      setLike(true);
      // "updateDoc" is a function that updates a Firestore document with the specified ID (movieRef)
      // The second argument to updateDoc is an object that represents the fields to update in the document. Here, the arrayUnion method is used to add an object to the savedMovies array in the document. The object contains three properties: id, title, and img, which are taken from the movie object.
      await updateDoc(movieRef, {
        savedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.poster_path,
        }),
      });
    } else {
      alert("Please sign in to save a movie.");
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
          <div
            onClick={() => selectMovie(movie)}
            className="posterOverlay"
          ></div>
        </div>
      ) : (
        <div className="posterImage posterImageNone">
          <p>No Image Available</p>
          <div
            onClick={() => selectMovie(movie)}
            className="posterOverlay"
          ></div>
        </div>
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
