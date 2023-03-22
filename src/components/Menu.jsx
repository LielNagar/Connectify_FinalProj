import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ConnectionContext } from "../context/ConnectionContext";
import Header from "./Header";

import "../style/myCSS.css";

export default function Menu() {
  let {currentUser} = useContext(ConnectionContext)
  if(!currentUser) currentUser = JSON.parse(sessionStorage.getItem('userLogged'));

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate("/Search", { state: currentUser, replace: true });
  };

  const navigateToMyProfile = () => {
    navigate(`/Profile/${currentUser.Id}`, { state: currentUser, replace: true });
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
        onClick={() => (window.location.href = "/")}
      >
        Logout
      </button>
    </div>
  );
}
