import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './login.css'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/task');
      console.log("User logged in");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="main">
      <div className="container shadow  rounded">
        <form onSubmit={handleLogin}>
          <div className="head">
            Login
          </div>
          <div className="row">
            <div className="col-md-12 mb-2">
              <label htmlFor="Email">Username</label>
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
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;
