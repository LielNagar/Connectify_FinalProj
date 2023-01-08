import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Menu(props) {

  const navigateToSearch = useNavigate();

  return (
    <div className='Menu'>
        <Link to='/Homepage'>Home Page</Link>
        <Link to='/MyProfile'>MyProfile</Link>
        <Link onClick={()=>{
          navigateToSearch('/Search', {state: props.user, replace:true})
        }}>Search a Friend</Link>
        <Link to='/'>Logout</Link>
    </div>
  )
}
