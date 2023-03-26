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
      setUserImage(Object.entries(data)[0][1].Img);
    });
  });

  return (
    <div className="chat-navbar">
      <span className="logo">{currentUser.UserName}'s Chat</span>
      <img
        src={
          userImage
            ? userImage
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
        }
        alt=""
        className="chat-user-image"
      />
    </div>
  );
}
