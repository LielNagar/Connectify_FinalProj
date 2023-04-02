import React, { useState, useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../../context/ConnectionContext";
import UserChat from "./UserChat";
import axios from "axios";

export default function ChatSearch(props) {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const [userToSearch, setUserToSearch] = useState(""); //for textbox
  const [users, setUsers] = useState(null);

  const handleSearch = async () => {
    await axios
      .get(
        `http://localhost:53653/api/Users/${currentUser.Id}/search/${userToSearch}/chat`
      )
      .then(async (response) => {
        if (response.status === 200) {
          let usersToSet = [];
          await response.data
            .filter((user) => user.Id !== currentUser.Id)
            .map(async (user) => {
              const db = getDatabase();
              const userPic = ref(db, "users/" + user.Id);
              onValue(userPic, async (snapshot) => {
                const data = snapshot.val();
                if (data) {
                  if (
                    Object.entries(data)[Object.keys(data).length - 1][1].Img
                  ) {
                    user.Avatar =
                      Object.entries(data)[Object.keys(data).length - 1][1].Img;
                    usersToSet.push(user);
                  }
                } else {
                  user.Avatar = null;
                  usersToSet.push(user);
                }
              });
            });
          setUsers(usersToSet);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="chat-search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user..."
          onChange={(e) => setUserToSearch(e.target.value)}
          onKeyUp={handleKey}
          value={userToSearch}
        />
      </div>
      {users
        ? users.map((user) => {
            return (
              <UserChat user={user} key={user.Id} currentUser={currentUser} />
            );
          })
        : null}
    </div>
  );
}
