import React from 'react'
import { Link } from 'react-router-dom'
import myCSS from '../style/myCSS.css'
export default function Menu() {

  return (
    <div className='Menu'>
        <Link to='/HomePage'>Home Page</Link>
        <Link to='/MyProfile'>MyProfile</Link>
        <Link to='/Search'>Search a Friend</Link>
        <Link to='/'>Logout</Link>
    </div>
  )
}
