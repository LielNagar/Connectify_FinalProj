import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import axios from "axios";
import Swal from "sweetalert2";

// import { ChatContext } from "../context/ChatContext";
import { ConnectionContext } from "../context/ConnectionContext";
import { ImageContext } from "../context/ImageContext";

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
            if(data) setUserImage(Object.entries(data)[0][1].Img);
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
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <h1 style={{ marginBottom: 50 }}> Welcome to Connectify!</h1>
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
            <button onClick={(e) => Login(e)} id="loginBTN">
              Connectify!
            </button>{" "}
            <br />
          </div>
          <div style={{ marginLeft: 15 }}>
            <label>Not A Member?</label>
            <Link to="/SignUp" style={{ marginLeft: 10 }}>
              Sign up here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
