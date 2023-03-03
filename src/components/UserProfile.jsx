import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { PostContext } from "./PostContext";
import Menu from "./Menu";
import UserDetails from "./UserDetails";
import AllPosts from "./AllPosts";

export default function UserProfile() {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const { userId } = useParams();
  const [post, setPost] = useState("");
  const { addPost } = useContext(PostContext);

  const [user, setUser] = useState({});
  useEffect(() => {
    console.log('user Profie render')
    axios.get(`http://localhost:53653/api/Users/${userId}`).then((response) => {
      setUser(response.data);
    });
  },[userId]);

  return (
    <div className="UserProfile">
      <Menu user={userLogged} />
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
          onChange={(e) => setPost(e.target.value)}
        />
        <br />
        <Button
          variant="text"
          style={{ marginLeft: "47%", marginRight: "30%" }}
          onClick={() => addPost(post, userLogged, userId)}
        >
          Add Post!
        </Button>
        <AllPosts user={user} currentId={userLogged.Id}/>
      </div>
    </div>
  );
}
