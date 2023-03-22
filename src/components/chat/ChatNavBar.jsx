import React, { useContext } from "react";

import { ImageContext } from "../../context/ImageContext";
import { ConnectionContext } from "../../context/ConnectionContext";

export default function ChatNavbar() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const { toBase64 } = useContext(ImageContext);

  return (
    <div className="chat-navbar">
      <span className="logo">{currentUser.UserName}'s Chat</span>
      <img
        src={
          currentUser.Avatar
            ? `data:image/png;base64,${toBase64(currentUser.Avatar)}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
        }
        alt=""
        className="chat-user-image"
      />
    </div>
  );
}
