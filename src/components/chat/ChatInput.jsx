import React, { useState } from "react";
import { getDatabase, ref, push, set, update } from "firebase/database";
import { storage } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref as sRef,
} from "firebase/storage";

export default function ChatInput(props) {
  const [messageData, setMessageData] = useState("");
  const [img, setImg] = useState(null);

  let combinedId = "";
  if (props.userChatId < props.currentUser.Id)
    combinedId = String(props.userChatId).concat(String(props.currentUser.Id));
  else
    combinedId = String(props.currentUser.Id).concat(String(props.userChatId));

  return (
    <div className="chatInput">
      <input
        type="text"
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
        <button
          onClick={async () => {
            const db = getDatabase();
            const messageListRef = ref(db, "chats/" + combinedId + "/messages");
            const newMessageListRef = push(messageListRef);
            if (img) {
              const storageRef = sRef(storage, uuid());
              const uploadTask = uploadBytesResumable(storageRef, img);
              uploadTask.on(
                (error) => {
                  console.log(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                      // await set(newMessageListRef, {
                      //   data: messageData,
                      //   senderId: props.currentUser.Id,
                      //   date: today,
                      //   img: downloadURL,
                      // });
                    }
                  );
                }
              );
            } else {
              await set(newMessageListRef, {
                Data: messageData,
                SenderId: props.currentUser.Id,
                Date: new Date().toUTCString(),
              });
              const updates = {};
              updates[
                "userChats/" +
                  props.userChatId +
                  "/" +
                  props.currentUser.Id +
                  "/LastMessage"
              ] = messageData;
              updates[
                "userChats/" +
                  props.currentUser.Id +
                  "/" +
                  props.userChatId +
                  "/LastMessage"
              ] = messageData;
              updates[
                "userChats/" +
                  props.currentUser.Id +
                  "/" +
                  props.userChatId +
                  "/Date"
              ] = new Date().toUTCString();
              updates[
                "userChats/" +
                  props.userChatId+
                  "/" +
                  props.currentUser.Id +
                  "/Date"
              ] = new Date().toUTCString();
              await update(ref(db), updates);
            }
            setImg(null);
            setMessageData("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}