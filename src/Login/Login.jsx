import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; 
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigator = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigator('/task')
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div className="main">
      <div className="container shadow rounded">
        <div className="loghead">Log In</div>
        <button
          type="button"
          className="btn btn-secondary gradient-btn mt-4"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
