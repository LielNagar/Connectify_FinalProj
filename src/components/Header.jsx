import React from "react";

export default function Header(props) {
  return (
    <div>
      <h3 style={{fontFamily:'Arial', color:'	#b4590e'}}>Welcome Back, {props.user ? props.user : "NO USER"}</h3>
    </div>
  );
}
