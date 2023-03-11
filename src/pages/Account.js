import NavBar from "../components/NavBar";
import SavedMovies from "../components/SavedMovies";
import "../scss/_global.scss";
import "../scss/_account.scss";

const Account = () => {
  return (
    <div className="accountContainer">
      <header className="accountHeader">
        <NavBar />
        <p>My Account</p>
      </header>
      <SavedMovies />
    </div>
  );
};

export default Account;
