import React, { useState, createContext } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'
export const PostContext = createContext()

export default function PostContextProvider(props) {
  const [posts, setPosts] = useState([])

  const addPost = (post, user) => {
    if (post === '') return Swal.fire(
      "Didn 't you forget something?",
      'What about putting some text in the post?',
      'question'
    )
    axios.post('http://localhost:53653/api/Posts', {
      Publisher: user.Id,
      content: post
    }).then((response) => {
      if (response.status === 201) setPosts(...posts, response.data)
    }).catch((error) => {
      console.log(error)
    })
    //setPosts([...posts, post])
  }

  return (
    <PostContext.Provider value={{ posts, addPost, setPosts }}>
      {props.children}
    </PostContext.Provider>
  )
}
