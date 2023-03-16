import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";

export default function ChatInput(props) {
  const [messageData, setMessageData] = useState("");
  let combinedId = "";
  if (props.userChatId < props.currentUser.Id)
    combinedId = String(props.userChatId ).concat(String(props.currentUser.Id));
  else combinedId = String(props.currentUser.Id).concat(String(props.userChatId ));

  return (
    <div className="chatInput">
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setMessageData(e.target.value)}
      />
      <div className="send">
        <img
          src="https://github.com/safak/youtube2022/blob/react-chat/src/img/attach.png?raw=true"
          alt=""
        />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img
            src="https://github.com/safak/youtube2022/blob/react-chat/src/img/img.png?raw=true"
            alt=""
          />
        </label>
        <button
          onClick={() => {
            const db = getDatabase();
            const postListRef = ref(db, "chats/" + combinedId + "/messages");
            const newPostRef = push(postListRef);
            const today = new Date().toDateString();
            set(newPostRef, {
              data: messageData,
              senderId: props.currentUser.Id,
              date: today
            });
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
