import React, { useContext, useEffect } from "react";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import { PostContext } from "../context/PostContext";

import Share from "./Share";
import Post from "./Post";

import "../styles/feed.css";
// import Post from '../post/Post'
// import {Posts} from "../../dummyData"

export default function Feed({ feed,userProfileId,onWall }) {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));
  const { posts, setPosts } = useContext(PostContext);
  useEffect(() => {
    if (feed) {   
      axios
        .get(`http://localhost:53653/api/Posts/${currentUser.Id}`)
        .then((response) => {
          setPosts(response.data);
        });
    } else {
      axios
        .get(`http://localhost:53653/api/Posts/Wall/${userProfileId}`)
        .then((response) => {
          setPosts(response.data);
        });
    }
    return ()=>{
      setPosts([])
    }
  }, [currentUser.Id, setPosts,userProfileId,feed]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share currentUser={currentUser} onWall={onWall}/>
        {posts.map((post) => {
          return (
            <Post
              key={post.Id}
              id={post.Id}
              isFav={post.IsFav}
              isLiked={post.IsLiked}
              publisherId={post.Publisher}
              data={post.Content}
              likes={post.Likes}
              dislikes={post.Dislikes}
              userName={post.UserName}
              userId={currentUser.Id}
              datetime={post.Date}
              onWall={post.OnWall}
            />
          );
        })}
      </div>
    </div>
  );
}
