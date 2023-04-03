import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { ConnectionContext } from "../context/ConnectionContext";

import { getDatabase, ref, push, set } from "firebase/database";
import { storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable, ref as sRef } from "firebase/storage";

import "../styles/loginPage.css";
import Swal from "sweetalert2";
export default function SignUpPage() {
  const { setCurrentUser } = useContext(ConnectionContext);

  const navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
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
              const uploadTask = uploadBytesResumable(
                storageRef,
                selectedImage
              );
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
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "You inserted an invalid email",
        title: "Something went wrong!",
      });
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

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
            <input
              placeholder="Username"
              className="loginInput"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="First Name"
              className="loginInput"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name"
              className="loginInput"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder="Location"
              className="loginInput"
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="date"
              style={{ height: 40 }}
              placeholder="Birthday"
              className="loginInput"
              onChange={(e) => setBirthday(e.target.value)}
            ></input>
            <div className="loginInput">
              <label style={{ color: "gray", fontSize: 20 }}>Gender</label>
              <label style={{ marginLeft: 10 }}>Male</label>
              <input
                style={{ marginLeft: 10 }}
                type="radio"
                name="gender"
                value={1}
                onChange={(e) => setGender(e.target.value)}
              />
              <label style={{ marginLeft: 10 }}>Female</label>
              <input
                style={{ marginLeft: 10 }}
                type="radio"
                name="gender"
                value={0}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
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
            <div style={{ marginBottom: 6, textAlign: "center" }}>
              <label htmlFor="file">
                <img
                  src="https://github.com/safak/youtube2022/blob/react-chat/src/img/img.png?raw=true"
                  alt=""
                />
                <br />
                <span>Click here to upload a profile picture :)</span>
              </label>
            </div>
            <br />
            <button className="loginButton" onClick={(e) => signUp(e)}>
              Sign up
            </button>
            <button
              className="loginRgisterButton"
              onClick={() => navigate("/")}
            >
              Log into account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
