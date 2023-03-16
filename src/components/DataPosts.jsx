import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { PostContext } from "./PostContext";

import AllPosts from "./AllPosts";
export default function DataPosts(props) {
  const [post, setPost] = useState("");
  const { addPost } = useContext(PostContext);
  return (
    <div style={{float:'left', width:'40%', marginLeft:'35%'}}>
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
        onClick={() => addPost(post, props.user)}
      >
        Add Post!
      </Button>
      <AllPosts user={props.user} state="feed" currentId={props.user.Id} />
    </div>
  );
}
