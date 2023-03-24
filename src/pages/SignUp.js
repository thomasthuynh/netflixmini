import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../scss/_signInSignUp.scss";
import AuthContextProvider from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";

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
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="signUpContainer">
      <NavBar />

      <div className="signInFormContainer">
        <div className="signInForm">
          <h1>Sign Up</h1>
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
            <button>Sign Up</button>
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
