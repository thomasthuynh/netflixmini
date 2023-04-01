import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <nav>
      <h1>
      <Link onClick={loadLandingPage}>Netflix <span className="mini">Mini</span></Link>
      </h1>

      {user?.email ? (
        <div className="searchBarAndAccountButtons">
          <Link to="/account">
            <button className="accountButton">Account</button>
          </Link>

          <button onClick={handleLogOut} className="logoutButton">
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
