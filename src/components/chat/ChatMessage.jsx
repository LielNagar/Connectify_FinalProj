import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export default function ChatMessage(props) {
  const [userPic, setUserPic] = useState(null);
  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + props.message[1].SenderId);
    onValue(userPic, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
          setUserPic(Object.entries(data)[Object.keys(data).length - 1][1].Img);
        }
      } else {
        setUserPic(null);
      }
    });
  });
  if (props.message[1].SenderId === "INIT") {
    return (
      <div>
        <p
          style={{
            textAlign: "center",
            background: "#b4590e",
            borderRadius: "55%",
          }}
        >
          {props.message[1].Data}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`chatMessage ${
        props.message[1].SenderId === props.currentUserId && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            userPic
              ? userPic
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
          } //NEED TO SHOW HERE USERS PROFILE PIC
          alt=""
        />
        <span style={{ fontSize: 10 }}>
          {new Date(props.message[1].Date).toLocaleString()}
        </span>
      </div>
      <div className="messageContent">
        {props.message[1].Data && <p>{props.message[1].Data}</p>}
        {props.message[1].Img && (
          <img src={props.message[1].Img + "?alt=media"} alt="" />
        )}
      </div>
    </div>
  );
}
