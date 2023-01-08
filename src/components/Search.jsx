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
import { useLocation } from 'react-router-dom';

export default function Search(props) {
    const { state: user } = useLocation()
    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const search = () =>{
        axios.get(`http://localhost:53653/api/Users/search/${name}`).then((response)=>{
            console.log(response.data)
            setUsers(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className='Search'>
            <Header user={props.user} />
            <Menu />
            <div id='searchArea'>
            <TextField
                onChange={(e)=> setName(e.target.value)}
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
            <UsersCards users={users} />
        </div>
    )
}
