import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import "../style/myCSS.css";

export default function Menu(props) {
  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate("/Search", { state: props.user, replace: true });
  };

  const navigateToMyProfile = () => {
    navigate(`/Profile/${props.user.Id}`, { state: props.user, replace: true });
  };

  const navigateToHomePage = () => {
    navigate("/Homepage", { state: props.user, replace: true });
  };

  const navigateToFavoritePosts = ()=>{
    navigate(`/Posts/Favorites/${props.user.Id}`, { state: props.user, replace: true });
  }

  return (
    <div className="menu">
    <Header user={props.user.UserName} />
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
