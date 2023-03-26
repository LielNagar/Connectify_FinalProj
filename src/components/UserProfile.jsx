import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import { PostContext } from "../context/PostContext";
import { ImageContext } from "../context/ImageContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from "./Menu";
import UserDetails from "./UserDetails";
import AllPosts from "./AllPosts";

export default function UserProfile() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  const { userProfileId } = useParams();
  const { addPost,setPostContent } = useContext(PostContext);

  const [user, setUser] = useState({});
  const { isRender } = useContext(ImageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${userProfileId}`)
      .then(async (response) => {
        setUser(response.data);
      });
  }, [userProfileId, isRender]);

  return (
    <div className="UserProfile">
      <Menu />
      <UserDetails user={user} />
      <div style={{ float: "left" }}>
        <TextField
          style={{
            width: "700px",
            marginLeft: "27%",
            marginTop: "120px",
            marginRight: "30%",
          }}
          multiline={true}
          rows={4}
          placeholder="Tell us something...."
          onChange={(e) => setPostContent(e.target.value)}
        />
        <br />
        <Button
          variant="text"
          style={{ marginLeft: "47%", marginRight: "30%" }}
          onClick={() => addPost(currentUser, userProfileId)}
        >
          Add Post!
        </Button>
        <AllPosts currentId={currentUser.Id} />
      </div>
    </div>
  );
}
