import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOut } from 'firebase/auth'; // Correctly import signOut
import { auth } from "../../../firebase"; // Ensure correct path to firebase.js

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
        <div className="log-out">
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
