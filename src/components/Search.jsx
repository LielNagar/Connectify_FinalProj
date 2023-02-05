import React, { useState } from 'react'
import UsersCards from './UsersCards';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import Header from './Header'
import Menu from './Menu'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@mui/material/TextField';

export default function Search(props) {
    const { state: user } = useLocation()
    const [name, setName] = useState('')
    const [users, setUsers] = useState([])

    const search = () => {
        axios.get(`http://localhost:53653/api/Users/${user.Id}/search/${name}`).then((response) => {
            let usersToShow = [];
            response.data.forEach((userReturned) => {
                if (userReturned.Id !== user.Id) usersToShow.push(userReturned)
            })
            setUsers(usersToShow)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='Search'>
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
