
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

//COMPONENTS
import AllPosts from './AllPosts';
import Header from './Header'
import Menu from './Menu'
import { PostContext } from './PostContext';


//import { useEffect } from 'react';
//import { ConnectionContext } from './ConnectionContext'

export default function HomePage() {
    const { state: user } = useLocation()
    const [post, setPost] = useState('')
    const { addPost } = useContext(PostContext)

    //const { userLogged, setUserLogged } = useContext(ConnectionContext) // SAME USER AS USE LOCATION
    // useEffect(()=>{
    //     setUserLogged(user)
    // },[userLogged])

    return (
        <div className='HomePage'>
            <Header user={user.UserName} />
            <Menu user={user} />
            <TextField style={{ width: '700px', marginTop: '5px', marginLeft: '27%', marginRight: '30%' }} multiline={true} rows={4} placeholder='leave us something....' onChange={(e) => setPost(e.target.value)} />
            <br />
            <Button variant="text" style={{ marginLeft: '47%', marginRight: '30%' }} onClick={() => addPost(post, user)}>Add Post!</Button>
            <AllPosts user={user} state='feed'/>
        </div>
    )
}
