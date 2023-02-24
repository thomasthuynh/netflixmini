import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../scss/_signInSignUp.scss";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, signIn } = useContext(AuthContextProvider);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="signInContainer">
      <NavBar />

      <div className="signInFormContainer">
        <div className="signInForm">
          <h1>Sign In</h1>
          {error ? <p className="errorMessage">{error}</p> : null}
          <form onSubmit={handleSignIn}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button>Sign In</button>
          </form>

          <p className="signUpText">
            New to Miniflix? <Link to="/signUp">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
