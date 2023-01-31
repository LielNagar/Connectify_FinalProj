import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import UsersCards from './UsersCards'

const MySwal = withReactContent(Swal)

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
            if(response.data.length === 0){
                return MySwal.fire({
                title: <i>My Pending Requests:</i>,
                html: <p>No pending friend requests</p>
            })
            }
            MySwal.fire({
                title: <i>My Pending Requests:</i>,
                html: <UsersCards users={response.data} pending={true} currentId={props.user.Id}/>
            })
        })
    }


    return (
        <div className='UserDetails' style={{ float: 'left', width: '20%' }}>
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
