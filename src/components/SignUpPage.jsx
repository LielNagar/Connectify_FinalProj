import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ConnectionContext } from "../context/ConnectionContext";

export default function SignUpPage() {
  const { setCurrentUser } = useContext(ConnectionContext);

  const navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:53653/api/Users", {
        email,
        password,
        userName,
        location,
        birthday,
        gender,
      })
      .then(async (response) => {
        if (response.status === 201) {
          let userToReturn = response.data;
          await axios
            .post("http://localhost:8080/user", {
              id: userToReturn.Id,
              userName,
              location,
              email,
            })
            .then((response) => {
              if (response.status === 201);
              sessionStorage.setItem("userLogged", JSON.stringify(userToReturn));
              setCurrentUser(userToReturn);
              navigate("/Homepage", { state: userToReturn });
            });
        }
      })
      .catch((error) => console.log(error));
  };

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="login-page">
      <h1> Welcome to Connectify!</h1>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            ></input>
            <br />
          </div>
          <div className="input-container">
            <label>User Name</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required={true}
            ></input>
            <br />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="text"
              onChange={(e) => setpassword(e.target.value)}
              required={true}
            ></input>
            <br />
          </div>
          <div className="input-container">
            <label>Location</label>
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
            <br />
          </div>
          <div className="input-container">
            <label>Birthday</label>
            <input
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
            ></input>
            <br />
          </div>
          <div className="gender-container">
            <label style={{ paddingRight: 12 }}>Gender:</label>
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="1"
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Female</label>
            <input
              type="radio"
              name="gender"
              value="0"
              onChange={(e) => setGender(e.target.value)}
            />
            <br />
            <input
              type="file"
              id="file"
              name="myImage"
              style={{ display: "none" }}
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
            <label htmlFor="file">
              <img
                style={{ marginLeft: 100 }}
                src="https://github.com/safak/youtube2022/blob/react-chat/src/img/img.png?raw=true"
                alt=""
              />
              <br />
              <span>Click here to upload a profile picture :)</span>
            </label>
          </div>
          <br />
          <div className="button-container">
            <button onClick={(e) => signUp(e)} id="signUpBTN">
              Connectify!
            </button>
            <br />
          </div>
          <div style={{ marginLeft: 170 }}>
            <label>Already with us?</label>
            <Link to="/" style={{ marginLeft: 10 }}>
              Login here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
