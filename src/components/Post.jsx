import React from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';
import { useState, useContext } from 'react';
import myCSS from '../style/myCSS.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';

export default function Post(props) {
    const [likes, setlikes] = useState(props.likes || 0)

    return (
        <div className='Post'>
            <Card sx={{ maxWidth: 700 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={props.profilerSrc}
                    alt={props.userName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.userName +', '+ props.datetime}
                    </Typography>
                    <Typography variant="body2">
                        {props.data}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => setlikes(prevLikes => prevLikes + 1)}>
                        <ThumbUpOffAltIcon color='primary' />
                    </IconButton>
                    <span>{likes}</span>
                </CardActions>
                <Link to={`/Profile/${props.publisherId}`}> go to {props.userName} profile</Link>
            </Card>
        </div>
    )
}



