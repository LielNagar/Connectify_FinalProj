import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";

import { RssFeed, Chat, Bookmark } from "@mui/icons-material";
import CloseFriend from "./CloseFriend";

import "../styles/sidebar.css";

export default function Sidebar(props) {
  const navigate = useNavigate();
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${currentUser.Id}/Friends`)
      .then((response) => {
        if (response.status === 200) setFriends(response.data);
      });
  }, [currentUser.Id]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li
            className="sidebarListItem"
            onClick={() =>
              navigate("/HomePage", { state: currentUser, replace: true })
            }
          >
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li
            className="sidebarListItem"
            onClick={() =>
              navigate("/Chat", { state: currentUser, replace: true })
            }
          >
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li
            className="sidebarListItem"
            onClick={() =>
              navigate(`/Posts/Favorites/${currentUser.Id}`, {
                state: currentUser,
                replace: true,
              })
            }
          >
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <span className="sidebarListItemText">My Friends</span>
          <br />
          {friends.map((user) => {
            return <CloseFriend key={user.Id} user={user} />;
          })}
        </ul>
      </div>
    </div>
  );
}
