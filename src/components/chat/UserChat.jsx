import React, { useEffect, useState, useContext } from "react";
import { ref, onValue, set, getDatabase, push } from "firebase/database";
 import { database } from "../../firebase/firebase"
// import { ChatContext } from "../context/ChatContext";

export default function UserChat(props) {

  const toBase64 = (arr) => {
    return btoa(
      arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  const handleSelect = async () => {
    let combinedId = "";
    if (props.user.Id < props.currentUser.Id)
      combinedId = String(props.user.Id).concat(String(props.currentUser.Id));
    else combinedId = String(props.currentUser.Id).concat(String(props.user.Id));
    const res = ref(database, "chats/" + combinedId); //NEED TO TAKE HERE THE MESSAEGS INSTEAD??
    let data;
    onValue(res, (snapshot) => {
      data = snapshot.val();
      console.log(data);
    });
    if (!data) {
      // NO CHAT HISTORY INIT WITH A MESSAGE SO CREATE /CHATS/COMBINEDID AND /USERSCHAT/CURRENTID/USERID
      const db = getDatabase();

      const postListRef = ref(db, "chats/" + combinedId + "/messages");
      const newPostRef = push(postListRef);
      set(newPostRef, {
        senderId: "INIT",
        date: new Date().toDateString(),
        data: "No Messages Yet...",
      });
      set(ref(db, "userChats/" + props.currentUser.Id + "/" + props.user.Id), {
        userName: props.user.UserName,
        profilePic: props.user.Avatar? `data:image/png;base64,${toBase64(props.user.Avatar)}`
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png",
        lastMessage: "No Messages Yet..."
      });
      set(ref(db, "userChats/" + props.user.Id + "/" + props.currentUser.Id), {
        userName: props.currentUser.UserName,
        profilePic: props.currentUser.Avatar? `data:image/png;base64,${toBase64(props.currentUser.Avatar)}`
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png",
        lastMessage: "No Messages Yet..."
      });
    }
  };

  return (
    <div
      className="userChat"
      onClick={handleSelect}
      key={props.user.Id}
    >
      <img
        src={
          props.user.Avatar
            ? `data:image/png;base64,${toBase64(props.user.Avatar)}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
        }
        alt=""
      />
      <div className="userChatInfo">
        <span>{props.user.UserName}</span>
      </div>
    </div>
  );
}
