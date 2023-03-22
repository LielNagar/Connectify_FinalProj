import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { PostContext } from "./PostContext";
import Post from "./Post";
import Menu from "./Menu";

export default function FavoritePosts(props) {
  const { posts, setPosts } = useContext(PostContext);
  let { state: user } = useLocation();
  if (!user) user = JSON.parse(localStorage.getItem("userLogged"));

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Posts/${user.Id}/Favorite`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setPosts(response.data);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: 'You have no favorite posts',
          title: error.response.data,
        });
      });
  }, [user.Id]);
  return (
    <div>
      <Menu user={user} />
      <div style={{ marginTop: 120 }}>
        {posts &&
          posts.map((post) => (
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
              userId={user.Id}
              datetime={post.Date}
            />
          ))}
      </div>
    </div>
  );
}
