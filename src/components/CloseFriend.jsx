import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <Link
        to={`/Profile/${user.Id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <img
          className="sidebarFriendImg"
          src={
            userProfileImage
              ? userProfileImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
          }
          alt=""
        />
      </Link>
      <Link
        to={`/Profile/${user.Id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <span className="sidebarFriendName">{user.UserName}</span>
      </Link>
    </li>
  );
}
