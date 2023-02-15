import { Link } from "react-router-dom";

const NavBar = ({searchMovies, setSearchValue, searchIcon}) => {

    return (
        <nav>
        <h1>Miniflix</h1>

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

          <Link to='/signin'>
            <button className="signInButton">Sign In</button>
          </Link>

          <Link to='/signup'>
            <button className="signUpButton">Sign Up</button>
          </Link>

        </div>
      </nav>
    )
}

export default NavBar;