import React, { useState, createContext } from "react";
import axios from "axios";

export const ChatContext = createContext();

export default function ChatContextProvider(props) {
  const [userChat, setUserChat] = useState(null);

  const getUserChatDetails = async(userId) => {
    await axios.get(`http://localhost:53653/api/Users/${userId}`).then((response) => {
      console.log(response);
      if (response.status === 200) setUserChat(response.data);
    });
  };

  return (
    <ChatContext.Provider
      value={{
        userChat,
        setUserChat,
        getUserChatDetails
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
