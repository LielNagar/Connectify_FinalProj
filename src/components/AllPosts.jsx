import React, { useEffect, useState, useContext } from 'react'
import Post from './Post';
import { PostContext } from './PostContext';

export default function AllPosts(props) {
  const { posts } = useContext(PostContext)
  useEffect(() => {
    console.log('component did mount')

    return () => {
      console.log('unmount');
    }
  })


  return (
    <div className='AllPosts'>
      {posts.map((post)=> <Post key='unique' data={post} userName='liel' datetime='Sun 18/12/22 17:00' profilerSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png'/>)}
    </div>
  )
}
