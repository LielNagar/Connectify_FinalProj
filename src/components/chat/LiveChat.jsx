import React from "react";
import ChatSideBar from "./ChatSideBar";
import Chat from "./Chat";

export default function LiveChat(props) {
  return (
    <div className="chat-container">
      <ChatSideBar user={props.user} />
      <Chat user={props.user} />
    </div>
  );
}
