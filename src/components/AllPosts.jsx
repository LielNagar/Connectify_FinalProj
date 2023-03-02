import React, { useEffect, useContext } from "react";
import Post from "./Post";
import { PostContext } from "./PostContext";
import axios from "axios";

import "../style/myCSS.css";

export default function AllPosts(props) {
  const { posts, setPosts } = useContext(PostContext);
  useEffect(() => {
    console.log('all post render')
    if (props.user.Id)
      if (props.state === "feed") {
        axios
          .get(`http://localhost:53653/api/Posts/${props.user.Id}`)
          .then((response) => {
            //console.log(response.data)
            setPosts(response.data);
          });
      } else {
        axios
          .get(`http://localhost:53653/api/Posts/${props.currentId}/Wall/${props.user.Id}`)
          .then((response) => {
            //console.log(response.data)
            setPosts(response.data);
          });
      }
      return (()=> setPosts([]))
  }, [props.user.Id, setPosts]);

  return (
    <div className="all-posts">
      {posts.map((post) => (
        <Post
          key={post.Id}
          id= {post.Id}
          isFav={post.IsFav}
          isLiked={post.IsLiked}
          publisherId={post.Publisher}
          data={post.Content}
          likes={post.Likes}
          dislikes={post.Dislikes}
          userName={post.UserName}
          userId={props.user.Id}
          datetime={post.Date}
          profilerSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
        />
      ))}
    </div>
  );
}
