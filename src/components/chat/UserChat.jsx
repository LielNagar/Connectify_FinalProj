import React, { useContext } from "react";
import { ref, onValue, set, getDatabase, push } from "firebase/database";
import { database } from "../../firebase/firebase";

import { ConnectionContext } from "../../context/ConnectionContext";
import { ChatContext } from "../../context/ChatContext";

export default function UserChat(props) {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));
  const { setUserChat } = useContext(ChatContext);

  const handleSelect = async () => {
    let combinedId = "";
    if (props.user.Id < currentUser.Id)
      combinedId = String(props.user.Id).concat(String(currentUser.Id));
    else
      combinedId = String(currentUser.Id).concat(String(props.user.Id));
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
        SenderId: "INIT",
        Date: new Date().toUTCString(),
        Data: "No Messages Yet...",
      });
      set(ref(db, "userChats/" + currentUser.Id + "/" + props.user.Id), {
        Id: props.user.Id,
        UserName: props.user.UserName,
        ProfilePic: props.user.Avatar
          ? props.user.Avatar
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s",
        LastMessage: "No Messages Yet...",
        Date: new Date().toUTCString(),
      });
      set(ref(db, "userChats/" + props.user.Id + "/" + currentUser.Id), {
        Id: currentUser.Id,
        UserName: currentUser.UserName,
        ProfilePic: currentUser.Avatar
          ? currentUser.Avatar
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s",
        LastMessage: "No Messages Yet...",
        Date: new Date().toUTCString(),
      });
      setUserChat(props.user);
    }
  };

  return (
    <div className="userChat" onClick={handleSelect} key={props.user.Id}>
      <img
        src={
          props.user.Avatar
            ? props.user.Avatar
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
        }
        alt=""
      />
      <div className="userChatInfo">
        <span>{props.user.UserName}</span>
      </div>
    </div>
  );
}
