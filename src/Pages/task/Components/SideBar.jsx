import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOut } from 'firebase/auth'; // Correctly import signOut
import { auth } from "../../../firebase"; // Ensure correct path to firebase.js
import ResetPassword from './ResetPassword';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const handleLogout = () => {
    signOut(auth) // Pass the auth object correctly
      .then(() => {
        console.log("User is logged out.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-inner">
        <div className="content mt-5" >
          <div className="links" style={{display:"flex",flexDirection:"column",rowGap:"20px"}}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Task</Link>
            <Link to='/reset' style={{ textDecoration: "none", color: "white" }}> Reset password
            </Link>
          </div>

          <div className="log-out">
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
