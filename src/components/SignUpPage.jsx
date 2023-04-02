import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ConnectionContext } from "../context/ConnectionContext";

import { getDatabase, ref, push, set } from "firebase/database";
import { storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable, ref as sRef } from "firebase/storage";

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
        firstName,
        lastName,
        location,
        birthday,
        gender,
      })
      .then(async (response) => {
        if (response.status === 201) {
          let userToReturn = response.data;
          sessionStorage.setItem("userLogged", JSON.stringify(userToReturn));
          setCurrentUser(userToReturn);
          if (selectedImage) {
            const db = getDatabase();
            const usersRef = ref(db, "users/" + userToReturn.Id);
            const newUsersRef = push(usersRef);
            const id = uuid();
            const storageRef = sRef(storage, id);
            const uploadTask = uploadBytesResumable(storageRef, selectedImage);
            uploadTask.on(
              (error) => {
                console.log(error);
              },
              async () => {
                await set(newUsersRef, {
                  Img:
                    "https://firebasestorage.googleapis.com/v0/b/finalproj-connectify.appspot.com/o/" +
                    id +
                    "?alt=media",
                });
              }
            );
          }
          navigate("/Homepage", { state: userToReturn });
        }
      })
      .catch((error) => console.log(error));
  };

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
            <label>First Name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required={true}
            ></input>
            <br />
          </div>
          <div className="input-container">
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
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
              value={1}
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Female</label>
            <input
              type="radio"
              name="gender"
              value={0}
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
