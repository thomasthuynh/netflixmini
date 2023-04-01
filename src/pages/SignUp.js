import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../scss/_signInSignUp.scss";
import AuthContextProvider from "../context/AuthContext";
import { useContext, useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createAccount } = useContext(AuthContextProvider);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      await createAccount(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signUpContainer">
      <NavBar />

      <div className="signUpFormContainer">
        <div className="signUpForm">
          <h2>Sign Up</h2>
          {error ? <p className="errorMessage">{error}</p> : null}

          <form onSubmit={handleSignUp}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
          </form>

          <p className="signUpText">
            Already subscribed to Netflix Mini? <Link to="/signIn">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
