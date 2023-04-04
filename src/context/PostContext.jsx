import React, { useState, createContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const PostContext = createContext();

export default function PostContextProvider(props) {
  const [posts, setPosts] = useState([]); //FOR ALL POSTS
  const [postContent, setPostContent] = useState("");

  const addPost = (user, onWall) => {
    if (postContent === "")
      return Swal.fire(
        "Didn't you forget something?",
        "What about putting some text in the post?",
        "question"
      );
    axios
      .post("/cgroup2/test2/tar1/api/Posts", {
        Publisher: user.Id,
        content: postContent,
        UserName: user.UserName,
        Date: new Date(),
        onWall,
      })
      .then((response) => {
        if (response.status === 201) {
          setPostContent("");
          setPosts([response.data, ...posts]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setAsLiked = async (postId, userId) => {
    axios
      .post(`/cgroup2/test2/tar1/api/Posts/Likes/${postId}/${userId}`)
      .then((response) => {
        if (response.status === 201) return true;
      })
      .catch((error) => console.log(error));
  };

  const setAsUnLiked = async (postId, userId) => {
    axios
      .delete(`/cgroup2/test2/tar1/api/Posts/Likes/${postId}/${userId}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const setAsFav = async (postId, userId) => {
    await axios
      .post(`/cgroup2/test2/tar1/api/Posts/Favorite/${postId}/${userId}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const setAsUnFav = async (postId, userId) => {
    await axios
      .delete(`/cgroup2/test2/tar1/api/Posts/Favorite/${postId}/${userId}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const deletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`/cgroup2/test2/tar1/api/Posts/${postId}`)
          .then((response) => {
            Swal.fire(response.data);
            setPosts((prevPosts) => {
              const newPosts = prevPosts.filter(
                (post) => post.Id !== postId
              );
              return newPosts;
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        setPosts,
        setAsLiked,
        setAsUnLiked,
        setAsFav,
        setAsUnFav,
        deletePost,
        setPostContent,
        postContent,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
