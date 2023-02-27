import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

//COMPONENTS
import AllPosts from "./AllPosts";
import Menu from "./Menu";
import { PostContext } from "./PostContext";

export default function HomePage() {
  let { state: user } = useLocation();
  if(!user) user = JSON.parse(localStorage.getItem('userLogged'));
  const [post, setPost] = useState("");
  const { addPost } = useContext(PostContext);

  return (
    <div className="HomePage">
      <Menu user={user} />
      <TextField
        style={{
          width: "700px",
          marginTop: "120px",
          marginLeft: "27%",
          marginRight: "30%",
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
        onClick={() => addPost(post, user)}
      >
        Add Post!
      </Button>
      <AllPosts user={user} state="feed" />
    </div>
  );
}
