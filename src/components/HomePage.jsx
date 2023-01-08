import Header from './Header'
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useContext } from 'react';
import AllPosts from './AllPosts';
import { PostContext } from './PostContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export default function HomePage() {
    const { state: user } = useLocation()
    const [post, setPost] = useState('')
    const { addPost } = useContext(PostContext)

    return (
        <div className='HomePage'>
            <Header user={user.UserName} />
            <Menu user={user}/>
            <TextField style={{ width: '700px', marginTop: '5px', marginLeft: '27%', marginRight: '30%' }} multiline={true} rows={4} placeholder='leave us something....' onChange={(e) => setPost(e.target.value)} />
            <br />
            <Button variant="text" style={{ marginLeft: '47%', marginRight: '30%' }} onClick={() => addPost(post,user)}>Add Post!</Button>
            <AllPosts user={user} />
        </div>
    )
}
