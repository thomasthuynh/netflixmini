import "../scss/_global.scss";
import "../scss/_nav.scss";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useState, useContext } from "react";

// Font imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HomeNavBar = ({
  isScrolled,
  searchValue,
  setSearchValue,
  searchMovies,
  fetchMovies,
  hamburgerMenuToggle,
  setHamburgerMenuToggle,
  hamburgerIcon,
  setHamburgerIcon,
  isClicked,
  setIsClicked,
}) => {
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleHamburgerMenu = () => {
    if (!isClicked) {
      setIsClicked(true);
      setHamburgerMenuToggle("hamburgerMenu");
      setHamburgerIcon("hamburgerIcon close");
    } else {
      setIsClicked(false);
      setHamburgerMenuToggle("hamburgerMenu hamburgerMenuInactive");
      setHamburgerIcon("hamburgerIcon");
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  const loadLandingPage = (e) => {
    e.preventDefault();
    setSearchValue("");
    navigate("/");
    fetchMovies();
  };

  return (
    <nav className={isScrolled ? "homeNav scrolled" : "homeNav"}>
      <h1>
        <Link onClick={loadLandingPage}>
          Netflix <span className="mini">Mini</span>
        </Link>
      </h1>

      {user?.email ? (
        // <div className="searchBarAndAccountButtons">
        //   <form onSubmit={searchMovies}>
        //     <div className="searchContainer">
        //       <input
        //         type="text"
        //         value={searchValue}
        //         onChange={(e) => setSearchValue(e.target.value)}
        //         placeholder="Search"
        //       />
        //       <button type="submit" className="searchButton">
        //         {searchIcon}
        //       </button>
        //     </div>
        //   </form>

        //   <Link to="/account">
        //     <button className="accountButton">Account</button>
        //   </Link>

        //   <button onClick={handleLogOut} className="logoutButton">
        //     Log Out
        //   </button>
        // </div>
        <div className="inputAndButtonsContainer">
          <div className="defaultMenu">
            <form onSubmit={searchMovies}>
              <div className="searchContainer">
                <input
                  type="text"
                  value={searchValue}
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

          {/* Hamburger Menu */}
          <div className="hamburgerMenuContainer">
            <div className={hamburgerIcon} onClick={toggleHamburgerMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>

            <div className={hamburgerMenuToggle}>
              <div className="hamburgerInputAndButtons">
                <form onSubmit={searchMovies}>
                  <div className="searchContainer">
                    <input
                      type="text"
                      value={searchValue}
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
            </div>
          </div>
        </div>
      ) : (
        <div className="inputAndButtonsContainer">
          <div className="defaultMenu">
            <form onSubmit={searchMovies}>
              <div className="searchContainer">
                <input
                  type="text"
                  value={searchValue}
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

          {/* Hamburger Menu */}
          <div className="hamburgerMenuContainer">
            <div className={hamburgerIcon} onClick={toggleHamburgerMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>

            <div className={hamburgerMenuToggle}>
              <div className="hamburgerInputAndButtons">
                <form onSubmit={searchMovies}>
                  <div className="searchContainer">
                    <input
                      type="text"
                      value={searchValue}
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
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavBar;
