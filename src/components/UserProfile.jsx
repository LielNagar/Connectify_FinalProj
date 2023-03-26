import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
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
  let {currentUser} = useContext(ConnectionContext)
  if(!currentUser) currentUser = JSON.parse(sessionStorage.getItem('userLogged'));

  const { userProfileId } = useParams();
  const [post, setPost] = useState("");
  const { addPost } = useContext(PostContext);

  const [user, setUser] = useState({});
  const {isRender} = useContext(ImageContext)

  useEffect(() => {
    let userToShow;
    axios
      .get(`http://localhost:53653/api/Users/${userProfileId}`)
      .then(async (response) => {
        if (response.status === 200) {
          userToShow = response.data;
          const db = getDatabase();
          const userPic = ref(db, "users/" + userProfileId);
          onValue(userPic, (snapshot) => {
            const data = snapshot.val();
            if (data) userToShow.Avatar = Object.entries(data)[0][1].Img;
          });
        }
        setUser(userToShow);
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
          onChange={(e) => setPost(e.target.value)}
        />
        <br />
        <Button
          variant="text"
          style={{ marginLeft: "47%", marginRight: "30%" }}
          onClick={() => addPost(post, currentUser, userProfileId)}
        >
          Add Post!
        </Button>
        <AllPosts currentId={currentUser.Id} />
      </div>
    </div>
  );
}
