import { Link } from "react-router-dom";

// Font imports
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const NavBar = ({searchMovies, setSearchValue}) => {

    const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />

    return (
        <nav>
        <h1><Link to="/">Miniflix</Link></h1>

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