import React from "react";
import ChatNavbar from "./ChatNavBar";
import ChatSearch from './ChatSearch';
import Chats from './Chats';

export default function ChatSideBar(props) {
  return (
    <div className="chat-sidebar">
      <ChatNavbar user={props.user} />
      <ChatSearch user={props.user} />
      <Chats user={props.user} />
    </div>
  );
}
