import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Search,
  Person,
  Chat,
  Logout,
} from "@mui/icons-material";

import { ConnectionContext } from "../context/ConnectionContext";
import { ImageContext } from "../context/ImageContext";

import UserCardPending from "./UserCardPending";
import "../styles/topbar.css";

const MySwal = withReactContent(Swal);

export default function Topbar() {
  const [name, setName] = useState("");
  let { currentUser, penders } = useContext(ConnectionContext);
  const { userImage } = useContext(ImageContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const navigate = useNavigate();

  const search = () => {
    navigate("/Search", { state: name, replace: true });
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

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo" onClick={navigateToHomePage}>
          Connectify
        </span>
        <span className="topbarLink" style={{ marginLeft: 10, color: "white" }}>
          Welcome back,{" "}
          {currentUser.UserName
            ? currentUser.UserName.replace(/\b\w/g, (x) => x.toUpperCase())
            : "NO USER"}
        </span>
      </div>
      <div className="topbarCentre">
        <div className="searchbar">
          <Search className="searchIcon" onClick={search} />
          <input
            placeholder="Search for friends..."
            className="searchInput"
            onKeyDown={(e) => {
              if (e.key === "Enter") search();
            }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={navigateToHomePage}>
            Home Page
          </span>
          <span className="topbarLink" onClick={navigateToMyProfile}>
            Profile
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person
              onClick={() => {
                MySwal.fire({
                  title: <i>My Pending Requests:</i>,
                  html: (
                    <div>
                      {penders.map((user) => (
                        <UserCardPending
                          key={user.Id}
                          id={user.Id}
                          name={user.UserName}
                          profileImgUrl={user.ProfileImgUrl}
                          pending={true}
                          birthday={user.Birthday}
                          currentId={currentUser.Id}
                        />
                      ))}
                    </div>
                  ),
                });
              }}
            />
            <span className="topbarIconBadge">{penders.length}</span>
          </div>
          <div className="topbarIconItem">
            <Chat
              onClick={() =>
                navigate("/Chat", { state: currentUser, replace: true })
              }
            />
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
        <img src={userImage} alt="" className="topbarImg" />
      </div>
    </div>
  );
}
