import axios from "axios";
import React, { useEffect, useContext } from "react";
// import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { ConnectionContext } from "../context/ConnectionContext";
import { PostContext } from "../context/PostContext";
import Post from "./Post";
// import Menu from "./Menu";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function FavoritePosts() {
  const { posts, setPosts } = useContext(PostContext);
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  useEffect(() => {
    axios
      .get(`/cgroup2/test2/tar1/api/Posts/${currentUser.Id}/Favorite`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setPosts(response.data);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "You have no favorite posts",
          title: error.response.data,
        });
      });
  }, [currentUser.Id, setPosts]);
  return (
    <>
      <Topbar />
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar />
        <div style={{ flex: 8, marginLeft: 10}}>
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
                userId={currentUser.Id}
                datetime={post.Date}
              />
            ))}
        </div>
      </div>
    </>
  );
}
