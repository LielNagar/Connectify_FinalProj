import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import "../styles/closeFriend.css";

export default function CloseFriend({ user }) {
  const [userProfileImage, setUserProfileImage] = useState(null);
  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + user.Id);
    onValue(userPic, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
          setUserProfileImage(
            Object.entries(data)[Object.keys(data).length - 1][1].Img
          );
        }
      } else {
        setUserProfileImage(null);
      }
    });
  }, [user.Id]);
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        onClick={() => console.log(user.Id)}
        src={
          userProfileImage
            ? userProfileImage
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
        }
        alt=""
      />
      <span className="sidebarFriendName" onClick={() => console.log(user.Id)}>
        {user.UserName}
      </span>
    </li>
  );
}
