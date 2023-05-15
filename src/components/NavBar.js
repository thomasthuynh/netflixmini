import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const loadLandingPage = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav>
      <h1>
        <Link onClick={loadLandingPage}>
          Netflix <span className="mini">Mini</span>
        </Link>
      </h1>
    </nav>
  );
};

export default NavBar;
