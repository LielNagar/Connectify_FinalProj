import React, { useState } from 'react'
import UserCard from './UserCard'

export default function UsersCards(props) {

    return (
        <div>
            {props.users.map((user) => <UserCard key={user.Id} id={user.Id} name={user.UserName} location={user.Location} profileImgUrl={user.ProfileImgUrl} />)}
        </div>
    )
}
