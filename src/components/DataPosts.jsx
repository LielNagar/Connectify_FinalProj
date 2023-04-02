import React, { useContext } from "react";

import { ConnectionContext } from "../context/ConnectionContext";
import { PostContext } from "../context/PostContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AllPosts from "./AllPosts";

export default function DataPosts() {
  const { addPost, setPostContent, postContent } = useContext(PostContext);
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
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <br />
      <Button
        variant="text"
        style={{ marginLeft: "47%", marginRight: "30%" }}
        onClick={() => addPost(currentUser)}
      >
        Add Post!
      </Button>
      <AllPosts state="feed" currentId={currentUser.Id} />
    </div>
  );
}
