import React from "react";

import ChatSideBar from "./ChatSideBar";
import Chat from "./Chat";

export default function LiveChat() {

  return (
    <div className="chat-container">
      <ChatSideBar />
      <Chat />
    </div>
  );
}
