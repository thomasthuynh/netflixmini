import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { logOut } = useContext(AuthContext);
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

      <div className="searchBarAndAccountButtons">
        <Link to="/account">
          <button className="accountButton">Account</button>
        </Link>

        <button onClick={handleLogOut} className="logoutButton">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
