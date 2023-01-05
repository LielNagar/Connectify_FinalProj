import React from 'react'
import Header from './Header'
import Menu from './Menu'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@mui/material/TextField';
import myCSS from '../style/myCSS.css'


export default function Search(props) {
    return (
        <div className='Search'>
            <Header user={props.user} />
            <Menu />
            <div id='searchArea'>
            <TextField
                label="Search your friends"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton onClick={()=> alert('searching....')}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            /></div>
        </div>
    )
}
