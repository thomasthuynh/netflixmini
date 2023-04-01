import "../scss/_global.scss";
import "../scss/_account.scss";
import NavBar from "../components/NavBar";
import SavedMovies from "../components/SavedMovies";

const Account = () => {
  return (
    <div className="accountContainer">
      <NavBar />
      <header className="accountHeader">
        <h2>My Movies</h2>
      </header>
      <SavedMovies />
    </div>
  );
};

export default Account;
