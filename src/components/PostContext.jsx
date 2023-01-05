import React, { useState, createContext } from 'react'
import Swal from 'sweetalert2';
export const PostContext = createContext()

export default function PostContextProvider(props) {
  const [posts, setPosts] = useState([])

  const addPost = (post) => {
    if(post=='') return Swal.fire(
      "Didn 't you forget something?",
      'What about putting some text to the post?',
      'question'
    )
    setPosts([...posts,post])
  }

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {props.children}
    </PostContext.Provider>
  )
}
