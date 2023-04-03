import React, { useContext, useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../../context/ConnectionContext";

export default function ChatNavbar() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const [userImage, setUserImage] = useState(null);
  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + currentUser.Id);
    onValue(userPic, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
          setUserImage(
            Object.entries(data)[Object.keys(data).length - 1][1].Img
          );
        }
      } else {
        setUserImage(null);
      }
    });
  });

  return (
    <div className="chat-navbar">
      <span className="logo">{currentUser.UserName.replace(/\b\w/g, (x) => x.toUpperCase())}'s Chat</span>
      <img
        src={
          userImage
            ? userImage
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
        }
        alt=""
        className="chat-user-image"
      />
    </div>
  );
}
