import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'


export default function SignUpPage() {

    const signUp = () =>{
        axios.post('http://localhost:53653/api/Users',{
            email,
            password,
            userName,
            location,
            profileImgUrl
        }).then((response) => {
            
        }).catch((error)=> console.log(error))
    }

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [userName, setUserName] = useState('')
    const [location, setLocation] = useState('')
    const [profileImgUrl, setprofileImgUrl] = useState('')


    return (
        <div className='SignUpPage'>
            <span>Email:</span>
            <input type='text' onChange={(e) => setEmail(e.target.value)}></input> <br />
            <span>userName:</span>
            <input type='text' onChange={(e) => setUserName(e.target.value)}></input> <br />
            <span>Password:</span>
            <input type='text' onChange={(e) => setpassword(e.target.value)}></input> <br />
            <span>Location:</span>
            <input type='text' onChange={(e) => setLocation(e.target.value)}></input> <br />
            <span>Profile image:</span>
            <input type='text' onChange={(e) => setprofileImgUrl(e.target.value)}></input> <br />
            <button onClick={signUp}>Sign Up</button> <br />
            <span>Already with us?</span>
            <Link to='/'>Login here!</Link>
        </div>
    )
}
