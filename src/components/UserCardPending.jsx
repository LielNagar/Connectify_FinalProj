import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../context/ConnectionContext";

import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

export default function UserCardPending(props) {
  const { denyFriendRequest, confirmFriendRequest, calculateAge } =
    useContext(ConnectionContext);

  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + props.id);
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
    <div style={{ border: "1px solid black", marginTop: 10 }}>
      <img
        alt=""
        src={
          userImage
            ? userImage
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
        }
        style={{
          width: "40px",
          borderRadius: 10,
          marginTop: "2px",
          marginLeft: "2px",
        }}
      />
      <Link
        to={`/Profile/${props.id}`}
        style={{
          textDecoration: "none",
          fontFamily: "Arial",
          fontSize: "20px",
          paddingBottom: "7px",
          marginBottom: "px",
          marginLeft: "6px",
          borderRight: "6px solid black",
        }}
      >
        {props.userName}
      </Link>
      <span style={{ marginLeft: "6px" }}>
        Age: {calculateAge(props.birthday)}
      </span>
      <span style={{ marginLeft: "6px" }}>
        Gender: {props.gender === 0 ? "Female" : "Male"}
      </span>
      <CheckSharpIcon
        style={{ border: "1px solid green", borderRadius: "50%" }}
        color="success"
        onClick={() =>
          confirmFriendRequest(props.currentId, props.id, props.userName)
        }
      />
      <ClearSharpIcon
        style={{ border: "1px solid red", borderRadius: "50%", marginLeft: 5 }}
        sx={{ color: "red" }}
        onClick={() =>
          denyFriendRequest(props.currentId, props.id, props.userName)
        }
      />
    </div>
  );
}
