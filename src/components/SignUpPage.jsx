import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
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
              email
            })
            .then((response) => {
              if (response.status === 201);
              localStorage.setItem("userLogged", JSON.stringify(userToReturn));
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

  return (
    <div className="login-page">
      <h1 style={{ marginBottom: 50 }}> Welcome to Connectify!</h1>
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
          </div>
          <br />
          <div className="button-container">
            <button onClick={(e) => signUp(e)} id="signUpBTN">
              Connectify!
            </button>
            <br />
          </div>
          <div style={{ marginLeft: 15 }}>
            <label>Already with us?</label>
            <Link to="/" style={{ marginLeft: 10 }}>
              Login here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  //   return (
  //     <div className="signup-page">
  //       <span>Email:</span>
  //       <input
  //         type="text"
  //         onChange={(e) => setEmail(e.target.value)}
  //       ></input>{" "}
  //       <br />
  //       <span>userName:</span>
  //       <input
  //         type="text"
  //         onChange={(e) => setUserName(e.target.value)}
  //       ></input>{" "}
  //       <br />
  //       <span>Password:</span>
  //       <input
  //         type="text"
  //         onChange={(e) => setpassword(e.target.value)}
  //       ></input>{" "}
  //       <br />
  //       <span>Location:</span>
  //       <input
  //         type="text"
  //         onChange={(e) => setLocation(e.target.value)}
  //       ></input>{" "}
  //       <br />
  //       <span>Profile image:</span>
  //       <input
  //         type="text"
  //         onChange={(e) => setprofileImgUrl(e.target.value)}
  //       ></input>{" "}
  //       <br />
  //       <span>Birthday:</span>
  // <input
  //   type="date"
  //   onChange={(e) => setBirthday(e.target.value)}
  // ></input>{" "}
  //       <br />
  //       <span>Gender:</span>
  // <input
  //   type="radio"
  //   name="gender"
  //   value="1"
  //   onChange={(e) => setGender(e.target.value)}
  // />
  // <label>Male</label>
  // <br />
  // <input
  //   type="radio"
  //   name="gender"
  //   value="0"
  //   style={{ marginLeft: 40 }}
  //   onChange={(e) => setGender(e.target.value)}
  // />
  // <label>Female</label>
  // <br />
  //       <button onClick={signUp}>Sign Up</button> <br />
  //       <span>Already with us?</span>
  //       <Link to="/">Login here!</Link>
  //     </div>
  //   );
}
