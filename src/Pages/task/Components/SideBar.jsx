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
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Task
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
};

export default SideBar;
