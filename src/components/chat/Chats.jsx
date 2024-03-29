import React, { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../../context/ConnectionContext";
import { ChatContext } from "../../context/ChatContext";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { setUserChat } = useContext(ChatContext);

  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  useEffect(() => {
    const db = getDatabase();
    const chats = ref(db, "userChats/" + currentUser.Id);
    onValue(chats, (snapshot) => {
      const data = snapshot.val();
      setChats(data);
    });
  }, [currentUser.Id]);

  const handleSelect = (chat) => {
    const user = {
      Id: chat[0],
      UserName: chat[1].UserName,
    };
    setUserChat(user);
  };

  return (
    <div className="chats">
      {chats
        ? Object.entries(chats)
            .sort((a, b) => new Date(b[1].Date) - new Date(a[1].Date))
            .map((chat) => {
              return (
                <div
                  className="userChat"
                  key={chat[0]}
                  onClick={() => handleSelect(chat)}
                >
                  <img
                    src={
                      chat[1].ProfilePic
                        ? chat[1].ProfilePic
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
                      {chat[1].UserName?.replace(/\b\w/g, (x) => x.toUpperCase())}
                    </span>
                    <p style={{ fontSize: 14, color: "rgb(70, 70, 70)" }}>
                      {chat[1].LastMessage}
                    </p>
                  </div>
                </div>
              );
            })
        : null}
    </div>
  );
}
