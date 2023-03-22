import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { PostContext } from "./PostContext";
import { ImageContext } from "../context/ImageContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from "./Menu";
import UserDetails from "./UserDetails";
import AllPosts from "./AllPosts";

export default function UserProfile() {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const { userId } = useParams();
  const [post, setPost] = useState("");
  const { addPost } = useContext(PostContext);

  const [user, setUser] = useState({});
  const {isRender} = useContext(ImageContext)

  useEffect(() => {
    let userToShow;
    axios
      .get(`http://localhost:53653/api/Users/${userId}`)
      .then(async (response) => {
        if (response.status === 200) {
          userToShow = response.data;
          await axios
            .get(`http://localhost:8080/users/${userId}`)
            .then((response) => {
              if (response.status === 200)
                userToShow.Avatar = response.data.avatar;
            });
        }
        setUser(userToShow);
      });
  }, [userId, isRender]);

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
        <AllPosts user={user} currentId={userLogged.Id} />
      </div>
    </div>
  );
}
