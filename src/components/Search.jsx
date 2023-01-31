import React from 'react'
import Header from './Header'
import Menu from './Menu'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@mui/material/TextField';
//import myCSS from '../style/myCSS.css'
import { useState } from 'react';
import axios from 'axios'
import UsersCards from './UsersCards';
import { useLocation, useParams } from 'react-router-dom';

export default function Search(props) {
    const { state: user } = useLocation()
    // const params = useParams();
    // const paramsAsJSON = JSON.parse(params)
    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const search = () => {
        axios.get(`http://localhost:53653/api/Users/${user.Id}/search/${name}`).then((response) => {
            let usersToShow = [];
            response.data.forEach((userReturned) => {
                if (userReturned.Id != user.Id) usersToShow.push(userReturned)
            })
            setUsers(usersToShow)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='Search'>
            <button onClick={() => console.log(user)}>onClick</button>
            <Header user={user.UserName} />
            <Menu user={user} />
            <div id='searchArea'>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    label="Search your friends"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={search}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                /></div>
            <UsersCards users={users} currentId={user.Id} />
        </div>
    )
}
