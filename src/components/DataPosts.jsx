import React, { useState, useContext } from "react";

import { ConnectionContext } from "../context/ConnectionContext";
import { PostContext } from "../context/PostContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AllPosts from "./AllPosts";

export default function DataPosts() {
  const [post, setPost] = useState("");
  const { addPost } = useContext(PostContext);
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  return (
    <div style={{ float: "left", width: "40%", marginLeft: "35%" }}>
      <TextField
        style={{
          width: "100%",
          marginTop: "120px",
        }}
        multiline={true}
        rows={4}
        placeholder="Tell us something...."
        onChange={(e) => setPost(e.target.value)}
      />
      <br />
      <Button
        variant="text"
        style={{ marginLeft: "47%", marginRight: "30%" }}
        onClick={() => addPost(post, currentUser)}
      >
        Add Post!
      </Button>
      <AllPosts state="feed" currentId={currentUser.Id} />
    </div>
  );
}
