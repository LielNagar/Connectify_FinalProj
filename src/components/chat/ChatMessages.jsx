import React, { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../../context/ConnectionContext";

import ChatMessage from "./ChatMessage";

export default function ChatMessages(props) {
  const [messages, setMessages] = useState([]);
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  useEffect(() => {
    if (props.userChatId) {
      let combinedId = "";
      if (props.userChatId < currentUser.Id)
        combinedId = String(props.userChatId).concat(
          String(currentUser.Id)
        );
      else
        combinedId = String(currentUser.Id).concat(
          String(props.userChatId)
        );
      const db = getDatabase();
      const messages = ref(db, "chats/" + combinedId);
      onValue(messages, (snapshot) => {
        const data = snapshot.val();
        setMessages(data.messages);
      });
    }
  }, [props.userChatId, currentUser.Id]);

  return (
    <div className="chatMessages">
      {Object.entries(messages).map((m) => (
        <ChatMessage
          message={m}
          key={m[0]}
          currentUserId={currentUser.Id}
        />
      ))}
    </div>
  );
}
