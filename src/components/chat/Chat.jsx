import React, { useContext } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import { ChatContext } from "../../context/ChatContext";

export default function Chat(props) {
  const { userChat } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
        Chatting with {userChat? userChat.UserName: null}
        </span>
      </div>
      <ChatMessages userChatId={userChat? userChat.Id: null} currentUser={props.user}/>
      <ChatInput userChatId={userChat? userChat.Id: null} currentUser={props.user}/>
    </div>
  );
}
// {userChat.displayName?  userChat.displayName: 'a'}
// 