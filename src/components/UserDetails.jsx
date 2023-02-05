import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import UsersCards from './UsersCards'

const MySwal = withReactContent(Swal)

export default function UserDetails(props) {
    const [friends, setFriends] = useState([])
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))

    useEffect(() => {
        axios.get(`http://localhost:53653/api/Users/${props.user.Id}/Friends`).then((response) => {
            console.log(response.data)
            setFriends(response.data)
        }).catch((error)=> console.log(error))
    }, [props.user.Id])

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
        }).catch((error)=> console.log(error))
    }


    return (
        <div className='UserDetails' style={{ float: 'left', width: '20%' }}>
            <img src={props.user.ProfileImgUrl? props.user.ProfileImgUrl:'har'}></img> <br />
            <p>Name: {props.user.UserName? props.user.UserName: 'No Name'}</p>
            <p>Age: {props.user.DateOfBirth? props.user.DateOfBirth:'No birth'}</p>
            <p>E-Mail: {props.user.Email? props.user.Email: 'No mail'}</p>
            <p>Gender: {props.user.Gender? props.user.Gender: 'No gender'}</p>
            {props.user.Id === userLogged.Id? <p>My Friends({friends.length})</p>:<p>{props.user.UserName} Friends({friends.length})</p>}
            {friends.map((friend) => <UserCard key={friend.Id} Id={friend.Id} ProfileImgUrl={friend.ProfileImgUrl} UserName={friend.UserName} />)}
            {props.user.Id === userLogged.Id? <button onClick={seePendingFriendsRequests}>Pending Friend Requests</button>:null}
        </div>
    )
}
