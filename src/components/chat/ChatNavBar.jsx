import React from "react";

export default function ChatNavbar(props) {
  const toBase64 = (arr) => {
    return btoa(
      arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <div className="chat-navbar">
      <span className="logo">{props.user.UserName}'s Chat</span>
      <img
        src={props.user.Avatar? `data:image/png;base64,${toBase64(props.user.Avatar)}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"}
        alt=""
        className="chat-user-image"
      />
    </div>
  );
}
