import React, { useContext } from "react";

import { ConnectionContext } from "../../context/ConnectionContext";
import { ChatContext } from "../../context/ChatContext";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function Chat() {
  const { userChat } = useContext(ChatContext);
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Chatting with {userChat ? userChat.UserName?.replace(/\b\w/g, (x) => x.toUpperCase()) : null}</span>
      </div>
      <ChatMessages
        userChatId={userChat ? userChat.Id : null}
      />
      <ChatInput
        userChatId={userChat ? userChat.Id : null}
      />
    </div>
  );
}
