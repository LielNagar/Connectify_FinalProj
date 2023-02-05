import React from 'react'

export default function Header(props) {
  return (
    <div>Hello {props.user? props.user:'NO USER'}</div>
  )
}
