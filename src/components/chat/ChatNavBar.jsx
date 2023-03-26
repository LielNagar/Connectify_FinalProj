import React, { useContext } from "react";

import { ConnectionContext } from "../../context/ConnectionContext";

export default function ChatNavbar() {
  let { currentUser, userImage } = useContext(ConnectionContext);
  if (!userImage) userImage = JSON.parse(sessionStorage.getItem("userImage"));
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  return (
    <div className="chat-navbar">
      <span className="logo">{currentUser.UserName}'s Chat</span>
      <img
        src={
          userImage
            ? userImage
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
        }
        alt=""
        className="chat-user-image"
      />
    </div>
  );
}
