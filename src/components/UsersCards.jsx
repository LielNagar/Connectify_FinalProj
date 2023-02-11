import React, { useState } from 'react'
import UserCard from './UserCard'

export default function UsersCards(props) {
    if (props.pending) {
        console.log(props.users)
        return (
            <div>
                {props.users.map((user) => <UserCard key={user.Id} id={user.Id} name={user.UserName} profileImgUrl={user.ProfileImgUrl} pending={true} currentId={props.currentId} />)}
            </div>
        )
    }
    console.log(props.users)
    return (
        <div>
            {props.users.map((user) => <UserCard key={user.Id} id={user.Id} name={user.UserName} location={user.Location} profileImgUrl={user.ProfileImgUrl} currentId={props.currentId} search={true} />)}
        </div>
    )
}
