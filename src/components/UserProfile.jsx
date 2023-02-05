
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PostContext } from './PostContext';
import Header from './Header'
import Menu from './Menu'
import UserDetails from './UserDetails'
import AllPosts from './AllPosts';

export default function UserProfile() {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const {userId} = useParams()
    const [post, setPost] = useState('')
    const { addPost } = useContext(PostContext)

    const [user, setUser] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:53653/api/Users/${userId}`).then((response)=>{
            setUser(response.data)
        })
    })

    return (
        <div className='UserProfile'>
            <Header user={userLogged.UserName} />
            <Menu user={userLogged} />
            <UserDetails user={user} />
            <div style={{ float: 'left' }}>
                <TextField style={{ width: '700px', marginTop: '5px', marginLeft: '27%', marginRight: '30%' }} multiline={true} rows={4} placeholder='leave us something....' onChange={(e) => setPost(e.target.value)} />
                <br />
                <Button variant="text" style={{ marginLeft: '47%', marginRight: '30%' }} onClick={() => addPost(post, userLogged)}>Add Post!</Button>
                <AllPosts user={user} />
            </div>
        </div>
    )
}
