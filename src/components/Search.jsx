import React, {  useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UsersCards from "./UsersCards";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Search() {
  const { state: name } = useLocation();
  const { users, setUsers } = useContext(ConnectionContext);

  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${currentUser.Id}/search/${name}`)
      .then((response) => {
        let usersToShow = [];
        response.data.forEach((userReturned) => {
          if (userReturned.Id !== currentUser.Id)
            usersToShow.push(userReturned);
        });
        setUsers(usersToShow);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name, currentUser.Id, setUsers]);

  return (
    <>
      <Topbar />
      <div style={{display:'flex'}}>
        <Sidebar />
        <UsersCards users={users} currentId={currentUser.Id} />
      </div>
    </>
  );
}
