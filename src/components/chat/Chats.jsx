import React, { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { ChatContext } from "../../context/ChatContext";

export default function Chats(props) {
  const [chats, setChats] = useState([]);
  const { setUserChat } = useContext(ChatContext);

  useEffect(() => {
    const db = getDatabase();
    const chats = ref(db, "userChats/" + props.user.Id);
    onValue(chats, (snapshot) => {
      const data = snapshot.val();
      setChats(data);
    });
  }, [props.user.Id]);

  const handleSelect = (chat)=>{
    const user ={
      id: chat[0],
      UserName: chat[1].UserName
    }
    setUserChat(user)
  }

  return (
    <div className="chats">
      {chats
        ? Object.entries(chats).map((chat) => {
            return (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat)}
              >
                <img
                  src={
                    chat[1].profilePic
                      ? chat[1].profilePic
                      : "https://cdn-icons-png.flaticon.com/512/21/21104.png"
                  }
                  alt=""
                />
                <div className="chatUserInfo">
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: "#987554",
                      marginTop: 10,
                    }}
                  >
                    {chat[1].userName}
                  </span>
                  <p style={{ fontSize: 14, color: "rgb(70, 70, 70)" }}>
                    {chat[1].lastMessage}
                  </p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
