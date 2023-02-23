import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../scss/_signInSignUp.scss'

const SignIn = () => {

    return (
      <div className="signInContainer">
        <NavBar />

        <div className="signInFormContainer">
          <div className="signInForm">
            <h2>Sign In</h2>

            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign In</button>
            </form>

            <p className="signUpText">New to Miniflix? <Link to="/signUp">Sign up now</Link></p>
          </div>
        </div>
      </div>
    );
}

export default SignIn;