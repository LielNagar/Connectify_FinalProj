import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/myCSS.css";

export default function LoginPage() {
  //SIDE FUNCTIONS//
  const Login = () => {
    axios
      .post(`http://localhost:53653/api/Users/login`, {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userLogged", JSON.stringify(response.data));
          navigate("/Homepage", { state: response.data, replace: true });
        }
      })
      .catch((error) => console.log(error));
  };
  //END OF SIDE FUNCTIONS//

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    // <div className='LoginPage'>
    //     <span>Email:</span>
    //     <input type='text' onChange={(e) => setEmail(e.target.value)}></input> <br />
    //     <span>Password:</span>
    //     <input type='text' onChange={(e) => setpassword(e.target.value)}></input> <br />
    //     <button onClick={Login}>Login</button> <br />
    //     <span>Not A Member?</span>
    //     <Link to='/SignUp'>Sign up here!</Link>
    // </div>
    <div className="form">
      <form>
        <div className="input-container">
          <label>Email </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          ></input>{" "}
          <br />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="text"
            onChange={(e) => setpassword(e.target.value)}
            required={true}
          ></input>{" "}
          <br />
        </div>
        <div className="button-container">
          <button onClick={Login} id='loginBTN'>Login</button> <br />
        </div>
        <label>Not A Member?</label>
        <Link to="/SignUp" style={{ marginLeft: 50 }}>
          Sign up here!
        </Link>
      </form>
    </div>
  );
}
