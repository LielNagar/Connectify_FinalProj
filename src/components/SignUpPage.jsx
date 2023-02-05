import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'


export default function SignUpPage() {
    const navigate = useNavigate()
    const signUp = () => {
        axios.post('http://localhost:53653/api/Users', {
            email,
            password,
            userName,
            location,
            profileImgUrl,
            birthday,
            gender
        }).then((response) => {
            if (response.status === 201) {
                console.log(response.data)
                localStorage.setItem('userLogged', JSON.stringify(response.data))
                navigate('/Homepage', { state: response.data })
            }
        }).catch((error) => console.log(error))
    }

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [userName, setUserName] = useState('')
    const [location, setLocation] = useState('')
    const [profileImgUrl, setprofileImgUrl] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState(0)

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
            <span>Birthday:</span>
            <input type='date' onChange={(e) => setBirthday(e.target.value)}></input> <br />
            <span>Gender:</span>
            <input type="radio" name="gender" value='1' onChange={(e)=> setGender(e.target.value)}/>
            <label>Male</label><br />
            <input type="radio" name="gender" value="0" style={{marginLeft:40}} onChange={(e)=> setGender(e.target.value)}/>
            <label>Female</label><br />
            <button onClick={signUp}>Sign Up</button> <br />
            <span>Already with us?</span>
            <Link to='/'>Login here!</Link>
        </div>
                )
}
