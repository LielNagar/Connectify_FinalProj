import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ConnectionContext } from "../context/ConnectionContext";
import Header from "./Header";

import "../style/myCSS.css";

export default function Menu() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate("/Search", { state: currentUser, replace: true });
  };

  const navigateToMyProfile = () => {
    navigate(`/Profile/${currentUser.Id}`, {
      state: currentUser,
      replace: true,
    });
  };

  const navigateToHomePage = () => {
    navigate("/Homepage", { state: currentUser, replace: true });
  };

  const navigateToFavoritePosts = () => {
    navigate(`/Posts/Favorites/${currentUser.Id}`, {
      state: currentUser,
      replace: true,
    });
  };

  return (
    <div className="menu">
      <Header user={currentUser.UserName} />
      <button className="menu-button" onClick={navigateToHomePage}>
        HomePage
      </button>
      <button className="menu-button" onClick={navigateToFavoritePosts}>
        Favorite Posts
      </button>
      <button className="menu-button" onClick={navigateToMyProfile}>
        My Profile
      </button>
      <button className="menu-button" onClick={navigateToSearch}>
        Search A Friend
      </button>
      <button
        className="menu-button"
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
      >
        Logout
      </button>
    </div>
  );
}
