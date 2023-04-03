import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Logout,
} from "@mui/icons-material";

import { ConnectionContext } from "../context/ConnectionContext";

import "../styles/topbar.css";

export default function Topbar() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const navigate = useNavigate();

  const navigateToMyProfile = () => {
    navigate(`/Profile/${currentUser.Id}`, {
      state: currentUser,
      replace: true,
    });
  };

  const navigateToHomePage = () => {
    navigate("/Homepage", { state: currentUser, replace: true });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Connectify</span>
        <span className="topbarLink" style={{ marginLeft: 10, color: "white" }}>
          Welcome back,{" "}
          {currentUser.UserName
            ? currentUser.UserName.replace(/\b\w/g, (x) => x.toUpperCase())
            : "NO USER"}
        </span>
      </div>
      <div className="topbarCentre">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friends..." className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={navigateToHomePage}>
            Home Page
          </span>
          <span className="topbarLink" onClick={navigateToMyProfile}>
            Timeline
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Logout
              onClick={() => {
                Swal.fire({
                  title: "Leaving so soon?",
                  text: "We will miss you!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/";
                  }
                });
              }}
            />
          </div>
        </div>
        <img src="/assets/persons/1.jpg" alt="" className="topbarImg" />
      </div>
    </div>
  );
}
