import "../scss/_global.scss";
import "../scss/_nav.scss";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ isScrolled, setSearchValue, searchMovies, fetchMovies }) => {
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
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
    e.preventDefault()
    navigate("/");
    fetchMovies();
  }

  return (
    <nav className={isScrolled ? "homeNav scrolled" : "homeNav"}>
      <h1>
        <Link onClick={loadLandingPage}>Miniflix</Link>
      </h1>

      {user?.email ? (
        <div className="searchBarAndAccountButtons">
          <form onSubmit={searchMovies}>
            <div className="searchContainer">
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
              />
              <button type="submit" className="searchButton">
                {searchIcon}
              </button>
            </div>
          </form>

          <Link to="/account">
            <button className="accountButton">Account</button>
          </Link>

          <button onClick={handleLogOut} className="logoutButton">
            Log Out
          </button>
        </div>
      ) : (
        <div className="searchBarAndAccountButtons">
          <form onSubmit={searchMovies}>
            <div className="searchContainer">
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
              />
              <button type="submit" className="searchButton">
                {searchIcon}
              </button>
            </div>
          </form>

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
