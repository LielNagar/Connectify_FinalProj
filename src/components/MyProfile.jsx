import React from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Menu from './Menu'
import UserDetails from './UserDetails'

export default function MyProfile(props) {
    const { state: user } = useLocation()

    return (
        <div className='MyProfile'>
            <Header user={user.UserName} />
            <Menu user={user} />
            <UserDetails user={user} />
        </div>
    )
}
