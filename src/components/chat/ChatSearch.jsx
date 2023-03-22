import React, { useState, useContext } from "react";

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
    try {
      await axios
        .get(
          `http://localhost:53653/api/Users/${currentUser.Id}/search/${userToSearch}`
        )
        .then(async (response) => {
          if (response.status === 200) {
            let usersToSet = [];
            await response.data.map(async (user) => {
              await axios
                .get(`http://localhost:8080/users/${user.Id}`)
                .then((response) => {
                  user.Avatar = response.data.avatar;
                  usersToSet.push(user);
                });
            });
            setUsers(usersToSet);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      console.log("asdsd");
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