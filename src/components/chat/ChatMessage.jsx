import React from "react";

export default function ChatMessage(props) {
  return (
    <div className={`chatMessage ${props.message[1].SenderId === props.currentUserId && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            props.message[1].SenderId === props.currentUserId
              ? "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
          } //NEED TO SHOW HERE USERS PROFILE PIC
          alt=""
        />
        <span style={{fontSize:10}}>{new Date(props.message[1].Date).toLocaleString()}</span>
      </div>
      <div className="messageContent">
        <p>{props.message[1].Data}</p>
        {props.message[1].Img && <img src={props.message[1].Img} alt="" />}
      </div>
    </div>
  );
}
