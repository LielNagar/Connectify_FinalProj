import React from "react";

export default function ChatMessage(props) {
  console.log(props.message)
  return (
    <div className="chatMessage owner">
      <div className="messageInfo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
          alt=""
        />
        <span>{props.message[1].date}</span>
      </div>
      <div className="messageContent">
        <p>{props.message[1].data}</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
          alt=""
        />
      </div>
    </div>
  );
}
