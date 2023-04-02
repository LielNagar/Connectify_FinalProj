import React, { useState, useContext } from "react";
import { getDatabase, ref, push, set, update } from "firebase/database";
import { storage } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable, ref as sRef } from "firebase/storage";
import Swal from "sweetalert2";

import { ConnectionContext } from "../../context/ConnectionContext";
import { ChatContext } from "../../context/ChatContext";

export default function ChatInput(props) {
  const [messageData, setMessageData] = useState("");
  const [img, setImg] = useState(null);
  let { currentUser } = useContext(ConnectionContext);
  const { userChat } = useContext(ChatContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  let combinedId = "";
  if (props.userChatId < currentUser.Id)
    combinedId = String(props.userChatId).concat(String(currentUser.Id));
  else combinedId = String(currentUser.Id).concat(String(props.userChatId));

  const sendMessage = async () => {
    const db = getDatabase();
    const messageListRef = ref(db, "chats/" + combinedId + "/messages");
    const newMessageListRef = push(messageListRef);
    if (img) {
      const id = uuid();
      const storageRef = sRef(storage, id);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        async () => {
          await set(newMessageListRef, {
            Data: messageData,
            SenderId: currentUser.Id,
            Date: new Date().toUTCString(),
            Img:
              "https://firebasestorage.googleapis.com/v0/b/finalproj-connectify.appspot.com/o/" +
              id,
          });
        }
      );
    } else {
      await set(newMessageListRef, {
        Data: messageData,
        SenderId: currentUser.Id,
        Date: new Date().toUTCString(),
      });
      const updates = {};
      updates[
        "userChats/" + props.userChatId + "/" + currentUser.Id + "/LastMessage"
      ] = messageData;
      updates[
        "userChats/" + currentUser.Id + "/" + props.userChatId + "/LastMessage"
      ] = messageData;
      updates[
        "userChats/" + currentUser.Id + "/" + props.userChatId + "/Date"
      ] = new Date().toUTCString();
      updates[
        "userChats/" + props.userChatId + "/" + currentUser.Id + "/Date"
      ] = new Date().toUTCString();
      await update(ref(db), updates);
    }
    setImg(null);
    setMessageData("");
  };

  return (
    <div className="chatInput">
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Type Something..."
        onChange={(e) => setMessageData(e.target.value)}
        value={messageData}
      />
      <div className="send">
        <img
          src="https://github.com/safak/youtube2022/blob/react-chat/src/img/attach.png?raw=true"
          alt=""
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img
            src="https://github.com/safak/youtube2022/blob/react-chat/src/img/img.png?raw=true"
            alt=""
          />
        </label>
        <button onClick={()=>{
          if(userChat) sendMessage()
          else{
            Swal.fire(
              "Didn't you forget something?",
              "What about choosing who you chat with?",
              "question"
            );
          }
        }}>Send</button>
      </div>
    </div>
  );
}
