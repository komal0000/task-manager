import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
const SideBar = ({ closeSidebar }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User is logged out.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="content mt-5">
          <div
            className="links"
          >
            <div>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <button className="btn text-start text-white ps-0" >
              <FontAwesomeIcon icon={faSignOutAlt} /> Task
            </button>
            </Link>

            </div>
            <div>

            <button className="btn text-start text-white ps-0" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
            </div>
          </div>
          <div className="log-out">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
