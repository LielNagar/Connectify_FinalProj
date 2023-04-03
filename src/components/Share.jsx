import React, { useEffect,useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import TextField from "@mui/material/TextField";

import { ImageContext } from "../context/ImageContext";
import { PostContext } from "../context/PostContext";

import "../styles/share.css";

export default function Share({ currentUser,onWall }) {
    
  let { userImage, setUserImage } =
  useContext(ImageContext);

  const { addPost, setPostContent, postContent } = useContext(PostContext);

  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + currentUser.Id);
    onValue(userPic, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
          setUserImage(
            Object.entries(data)[Object.keys(data).length - 1][1].Img
          );
        }
      } else {
        setUserImage(null);
      }
    });
  }, [currentUser.Id, setUserImage]);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={userImage? userImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"} alt="" />
          <TextField
        className="shareInput"
        multiline={true}
        rows={4}
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <button className="shareButton" onClick={()=>addPost(currentUser,onWall)}>Share</button>
        </div>
      </div>
    </div>
  );
}
