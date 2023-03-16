import React, { useEffect, useState, useContext } from "react";
// import { ref, onValue, set, getDatabase, push } from "firebase/database";
// import { database } from "../firebase/firebase";

import UserChat from "./UserChat";

import axios from "axios";

export default function ChatSearch(props) {
  const [userToSearch, setUserToSearch] = useState(""); //for textbox
  const [users, setUsers] = useState(null);

  const handleSearch = async () => {
    try {
      await axios
        .get(
          `http://localhost:53653/api/Users/${props.user.Id}/search/${userToSearch}`
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
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      {users
        ? users.map((user) => {
            return (
              <UserChat user={user} key={user.Id} currentUser={props.user} />
            );
          })
        : null}
    </div>
  );
}

// useEffect(()=>{
//   console.log('usersFounds')
// },[users])

// const handleSelect = async (userId) => {
//   await getUserChatDetails(userId)
//   console.log(userChat)
//   let combinedId = "";
//   if (userId < props.user.Id)
//     combinedId = String(userId).concat(String(props.user.Id));
//   else combinedId = String(props.user.Id).concat(String(userId));
//   const res = ref(database, "chats/" + combinedId); //NEED TO TAKE HERE THE MESSAEGS INSTEAD??
//   let data;
//   onValue(res, (snapshot) => {
//     data = snapshot.val();
//     console.log(data);
//   });
//   if (!data) {
//     // NO CHAT HISTORY INIT WITH A MESSAGE SO CREATE /CHATS/COMBINEDID AND /USERSCHAT/CURRENTID/USERID
//     const db = getDatabase();
//     console.log(combinedId);
//     const date = new Date();

//     const postListRef = ref(db, "chats/" + combinedId + "/messages");
//     const newPostRef = push(postListRef);
//     set(newPostRef, {
//       senderId: "INIT",
//       date: new Date().toDateString(),
//       data: "No Messages Yet...",
//     });
//     await set(
//       ref(db, "userChats/" + props.user.Id + "/" + userId),
//       userChat
//     );
//   }
//   setUserToSearch("");
//   setUsers([]);
// };
