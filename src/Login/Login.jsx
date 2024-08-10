import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth , provider } from "../firebase";
import './login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="main">
      <div className="container shadow  rounded">
        <form>
          <div className="head">
            Login
          </div>
          <div className="row">
            <div className="col-md-12 mb-2">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
              />
            </div>
            <div className="col-md-12 mb-2">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-12 mt-4">
              <button type="submit" className="btn btn-primary gradient-btn">Log In</button>
            </div>
            <div className="bottom">
              <div className="text">
                or Sign Up Using
              </div>
              <div className="signup">
                Singn Up
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;
