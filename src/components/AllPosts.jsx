import React, { useEffect, useContext } from "react";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import { PostContext } from "../context/PostContext";

import Post from "./Post";

export default function AllPosts(props) {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    if (currentUser.Id)
      if (props.state === "feed") {
        axios
          .get(`http://localhost:53653/api/Posts/${currentUser.Id}`)
          .then((response) => {
            //console.log(response.data)
            setPosts(response.data);
          });
      } else {
        axios
          .get(`http://localhost:53653/api/Posts/Wall/${props.userProfileId}`)
          .then((response) => {
            //console.log(response.data)
            setPosts(response.data);
          });
      }
    return () => setPosts([]);
  }, [
    currentUser.Id,
    setPosts,
    props.state,
    props.userProfileId,
  ]);

  return (
    <div className="all-posts">
      {posts.map((post) => (
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
      ))}
    </div>
  );
}
