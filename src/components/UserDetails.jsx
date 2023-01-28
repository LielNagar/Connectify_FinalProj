import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'

export default function UserDetails(props) {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:53653/api/Users/${props.user.Id}/Friends`).then((response) => {
            console.log(response.data)
            setFriends(response.data)
        })
    }, [])

    const seePendingFriendsRequests = () => {
        axios.get(`http://localhost:53653/api/Users/${props.user.Id}/Friends/Pending`).then((response) => {
            console.log(response.data)
        })
    }


    return (
        <div className='UserDetails'>
            <img src={props.user.ProfileImgUrl}></img> <br />
            <p>Name: {props.user.UserName}</p>
            <p>Age: {props.user.DateOfBirth}</p>
            <p>E-Mail: {props.user.Email}</p>
            <p>Gender: {props.user.Gender}</p>
            <p>My Friends({friends.length})</p>
            {friends.map((friend) => <UserCard key={friend.Id} Id={friend.Id} ProfileImgUrl={friend.ProfileImgUrl} UserName={friend.UserName} />)}
            <button onClick={seePendingFriendsRequests}>Pending Friend Requests</button>
        </div>
    )
}
