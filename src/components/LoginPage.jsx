import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { ChatContext } from "../context/ChatContext";

export default function LoginPage() {
  const { setCurrentUser } = useContext(ChatContext);
  const Login = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:53653/api/Users/login`, {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      })
      .then(async (response) => {
        if (response.status === 200) {
          let userToReturn = response.data;
          await axios
            .get(`http://localhost:8080/users/${response.data.Id}`)
            .then((response) => {
              if (response.status === 200) {
                userToReturn.Avatar = response.data.avatar;
              }
              localStorage.setItem("userLogged", JSON.stringify(userToReturn));
              setCurrentUser(userToReturn);
              navigate("/Homepage", { state: userToReturn, replace: true });
            });
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
