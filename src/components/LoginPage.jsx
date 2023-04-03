import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import axios from "axios";
import Swal from "sweetalert2";

// import { ChatContext } from "../context/ChatContext";
import { ConnectionContext } from "../context/ConnectionContext";
import { ImageContext } from "../context/ImageContext";
import "../styles/loginPage.css";

export default function LoginPage() {
  // const { setCurrentUser } = useContext(ChatContext);
  const { setUserImage } = useContext(ImageContext);
  const { setCurrentUser } = useContext(ConnectionContext);

  const Login = async (e) => {
    var data;
    e.preventDefault();
    await axios
      .post(`http://localhost:53653/api/Users/login`, {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      })
      .then(async (response) => {
        if (response.status === 200) {
          let userToReturn = response.data;
          const db = getDatabase();
          const userPic = ref(db, "users/" + userToReturn.Id);
          onValue(userPic, async (snapshot) => {
            data = snapshot.val();
            if (data) setUserImage(Object.entries(data)[0][1].Img);
          });
          sessionStorage.setItem("userLogged", JSON.stringify(userToReturn));
          setCurrentUser(userToReturn);
          navigate("/Homepage", { state: userToReturn, replace: true });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data,
          title: "Something went wrong!",
        });
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Connectify</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Connectify
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" onChange={(e)=> setEmail(e.target.value)}/>
            <input placeholder="Password" className="loginInput" onChange={(e)=> setPassword(e.target.value)} />
            <button className="loginButton" onClick={(e)=> Login(e)}>Log In</button>
            <span className="loginForgot" onClick={()=> console.log('to be continued...')}>Forgot Password?</span>
            <button className="loginRgisterButton" onClick={()=> navigate('/SignUp')}>Create a new Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
