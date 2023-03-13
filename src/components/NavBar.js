import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ searchMovies, setSearchValue, fetchMovies }) => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loadLandingPage = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav>
      <h1>
        <Link onClick={loadLandingPage}>Miniflix</Link>
      </h1>

      {user?.email ? (
        <div className="searchBarAndAccountButtons">
          <Link to="/account">
            <button className="signInButton">Account</button>
          </Link>

          <button onClick={handleLogOut} className="signUpButton">
            Log Out
          </button>
        </div>
      ) : (
        <div className="searchBarAndAccountButtons">
          <Link to="/signin">
            <button className="signInButton">Sign In</button>
          </Link>

          <Link to="/signup">
            <button className="signUpButton">Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
