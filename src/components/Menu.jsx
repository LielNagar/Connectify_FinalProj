import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Menu(props) {

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/Search', { state: props.user, replace: true })
  }

  const navigateToMyProfile = () => {
    navigate(`/Profile/${props.user.Id}`, { state: props.user, replace: true })
  }

  const navigateToHomePage = () => {
    navigate('/Homepage', { state: props.user, replace: true })
  }

  return (
    <div className='Menu'>
      <button onClick={navigateToHomePage}>HomePage</button>
      <button onClick={navigateToMyProfile}>My Profile</button>
      <button onClick={navigateToSearch}>Search A Friend</button>
      <Link to='/'>Logout</Link>
    </div>
  )
}
