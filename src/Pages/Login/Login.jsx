import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      console.log("User logged in");
    } catch (err) {
      setError("Failed to log in. Please check your email and password.");
      console.error("Error logging in:", err);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError('Failed to send password reset email. Please check your email.');
      console.error('Error sending password reset email:', error);
    }
  };
  const toggleForm = () => {
    setIsForgotPassword(!isForgotPassword);
    setMessage("");
    setError("");
  }

  return (
    <div className="main">
      <div className="container shadow rounded">
        <form onSubmit={isForgotPassword ? handlePasswordReset : handleLogin}>
          <div className="head">
            {isForgotPassword ? "Reset Password" : "Login"}
          </div>
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="row">
            <div className="col-md-12 mb-2">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                required
              />
            </div>
            {!isForgotPassword && (
              <div className="col-md-12 mb-2">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="col-md-12 mt-2 p-0 text-end" >
              {!isForgotPassword ? (
                <button type="button" className="btn" onClick={toggleForm}>
                  Forgot Password
                </button>
              ) : (
                <button type="button" className="btn"  onClick={toggleForm}>
                  Back to Login
                </button>
              )}
            </div>
            <div className="col-md-12 mt-3">
              <button type="submit" className="btn btn-primary gradient-btn">
                {isForgotPassword ? "Send Reset Link" : "Log In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
