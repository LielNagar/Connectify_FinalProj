import React from "react";
import ChatNavbar from "./ChatNavBar";
import ChatSearch from './ChatSearch';
import Chats from './Chats';

export default function ChatSideBar() {
  return (
    <div className="chat-sidebar">
      <ChatNavbar />
      <ChatSearch />
      <Chats />
    </div>
  );
}
