import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../context/ConnectionContext";

import "../styles/rightbar.css";

export default function Rightbar(props) {
  const [birthdayCelebrators, setBirthdayCelebrators] = useState([]);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  const { userProfileId } = useParams();

  let { currentUser, calculateAge, setPenders } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${currentUser.Id}/dashboard`)
      .then((response) => {
        if (response.status === 200) {
          setBirthdayCelebrators(response.data[0]);
          setPenders(response.data[1]);
        }
      })
      .catch((error) => setError(error));
    if (userProfileId) {
      axios
        .get(`http://localhost:53653/api/Users/${userProfileId}/Friends`)
        .then((response) => {
          setFriends(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser.Id, userProfileId, setPenders]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            {error ? (
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                {error.response.data}
              </p>
            ) : birthdayCelebrators.length > 0 ? (
              birthdayCelebrators.map((celebrator) => {
                return (
                  <p>
                    <b>
                      <Link
                        to={`/Profile/${celebrator.Id}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        {celebrator.UserName+ ' '}
                      </Link>
                    </b>
                    have a birthday today, wish him best!
                  </p>
                );
              })
            ) : (
              <p style={{ fontWeight: "bold" }}>No Celebrators For Today...</p>
            )}
          </span>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{props.user.Location}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Age:</span>
            <span className="rightbarInfoValue">
              {props.user.Birthday
                ? calculateAge(props.user.Birthday)
                : "No birth"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">
              {props.user.Email ? props.user.Email : "No mail"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Gender:</span>
            <span className="rightbarInfoValue">
              {props.user.Gender ? "Male" : "Female"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            const db = getDatabase();
            const userPic = ref(db, "users/" + friend.Id);
            onValue(userPic, async (snapshot) => {
              const data = snapshot.val();
              if (data) {
                if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
                  friend.picture =
                    Object.entries(data)[Object.keys(data).length - 1][1].Img;
                }
              } else {
                friend.picture =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s";
              }
            });
            return (
              <div className="rightbarFollowing" key={friend.Id}>
                <Link
                  to={`/Profile/${friend.Id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={friend.picture ? friend.picture : null}
                    alt=""
                    className="rightbarFollowingImg"
                  />{" "}
                </Link>
                <span className="rightbarFollowingname">
                  {friend.UserName.replace(/\b\w/g, (x) => x.toUpperCase())}
                </span>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {props.user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
