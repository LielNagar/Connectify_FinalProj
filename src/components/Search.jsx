import React, { useState, useContext } from "react";
import UsersCards from "./UsersCards";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import Menu from "./Menu";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";

export default function Search() {
  const [name, setName] = useState("");
  const { users, setUsers } = useContext(ConnectionContext);
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const search = () => {
    axios
      .get(`http://localhost:53653/api/Users/${currentUser.Id}/search/${name}`)
      .then((response) => {
        let usersToShow = [];
        response.data.forEach((userReturned) => {
          if (userReturned.Id !== currentUser.Id) usersToShow.push(userReturned);
        });
        setUsers(usersToShow);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Search">
      <Menu />
      <div id="searchArea">
        <TextField
          onChange={(e) => setName(e.target.value)}
          style={{ marginTop: 120 }}
          label="Search your friends"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={search}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <UsersCards users={users} currentId={currentUser.Id} />
    </div>
  );
}
