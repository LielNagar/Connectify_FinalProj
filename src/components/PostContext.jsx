import React, { useState, createContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const PostContext = createContext();

export default function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const addPost = (post, user) => {
    if (post === "")
      return Swal.fire(
        "Didn't you forget something?",
        "What about putting some text in the post?",
        "question"
      );
    axios
      .post("http://localhost:53653/api/Posts", {
        Publisher: user.Id,
        content: post,
        UserName: user.UserName,
        Date: new Date(),
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) setPosts([response.data, ...posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setAsLiked = (postId, userId) => {
    axios
      .post(`http://localhost:53653/api/Posts/Likes/${postId}/${userId}`)
      .then((response) => {
        if(response.status === 201) return true;
      })
      .catch((error) => console.log(error));
  };

  const setAsFav = (postId, userId) => {
    axios
      .post(`http://localhost:53653/api/Posts/Favorite/${postId}/${userId}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <PostContext.Provider
      value={{ posts, addPost, setPosts, setAsLiked, setAsFav }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
