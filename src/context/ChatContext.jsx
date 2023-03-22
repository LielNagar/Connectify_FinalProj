import React, { useState, createContext } from "react";

export const ChatContext = createContext();

export default function ChatContextProvider(props) {
  const [userChat, setUserChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        userChat,
        setUserChat,
        currentUser,
        setCurrentUser
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
