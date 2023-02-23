import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../scss/_signInSignUp.scss'

const SignUp = () => {

    return (
        <div className="signUpContainer">
        <NavBar />

        <div className="signInFormContainer">
          <div className="signInForm">
            <h2>Sign Up</h2>

            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>

            <p className="signUpText">Already subscribed to Miniflix? <Link to="/signIn">Sign in</Link></p>
          </div>
        </div>
      </div>
    )
}

export default SignUp;