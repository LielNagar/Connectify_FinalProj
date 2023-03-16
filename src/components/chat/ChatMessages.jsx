import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import ChatMessage from "./ChatMessage";

export default function ChatMessages(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (props.userChatId) {
      let combinedId = "";
      if (props.userChatId < props.currentUser.Id)
        combinedId = String(props.userChatId).concat(
          String(props.currentUser.Id)
        );
      else
        combinedId = String(props.currentUser.Id).concat(
          String(props.userChatId)
        );
      const db = getDatabase();
      const messages = ref(db, "chats/" + combinedId);
      onValue(messages, (snapshot) => {
        const data = snapshot.val();
        setMessages(data.messages);
      });
    }
  }, [props.userChatId]);
  
  return (
    <div className="chatMessages">
      {Object.entries(messages).map((m) => (
        <ChatMessage message={m} />
      ))}
    </div>
  );
}
