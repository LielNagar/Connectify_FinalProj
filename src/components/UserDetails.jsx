import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserCardPending from "./UserCardPending";
import { CiSettings } from "react-icons/ci";

const MySwal = withReactContent(Swal);

export default function UserDetails(props) {
  const [friends, setFriends] = useState([]);
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  useEffect(() => {
    if (props.user.Id) {
      axios
        .get(`http://localhost:53653/api/Users/${props.user.Id}/Friends`)
        .then((response) => {
          console.log(response.data);
          setFriends(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [props.user.Id]);

  const seePendingFriendsRequests = () => {
    axios
      .get(`http://localhost:53653/api/Users/${props.user.Id}/Friends/Pending`)
      .then((response) => {
        if (response.data.length === 0) {
          return MySwal.fire({
            title: <i>My Pending Requests:</i>,
            html: <p>No pending friend requests</p>,
          });
        }
        MySwal.fire({
          title: <i>My Pending Requests:</i>,
          html: (
            <div>
              {response.data.map((user) => (
                <UserCardPending
                  key={user.Id}
                  id={user.Id}
                  name={user.UserName}
                  profileImgUrl={user.ProfileImgUrl}
                  pending={true}
                  currentId={props.user.Id}
                  setFriends={setFriends}
                  friends={friends}
                />
              ))}
            </div>
          ),
        });
      })
      .catch((error) => console.log(error));
  };

  const calculateAge = (date) => {
    date = new Date(date);
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let age = year - date.getFullYear();
    if (month < date.getMonth()) age--;
    return String(age);
  };

  return (
    <div className="UserDetails" style={{ float: "left", width: "15%", height:'90vh', borderRight:'2px solid #b4590e',marginTop:'50px ' }}>
      <img
        src={props.user.ProfileImgUrl ? props.user.ProfileImgUrl : "har"}
      ></img>{" "}
      <br />
      <span>Name: {props.user.UserName ? props.user.UserName : "No Name"}</span>
      {props.user.Id === userLogged.Id ? (
        <CiSettings
          style={{ marginTop: 50, display: "inline", marginLeft: 100 }}
          onClick={() => alert("settings")}
          size="32px"
        />
      ) : null}
      <p>
        Age:{" "}
        {props.user.Birthday ? calculateAge(props.user.Birthday) : "No birth"}
      </p>
      <p>E-Mail: {props.user.Email ? props.user.Email : "No mail"}</p>
      <p>Gender: {props.user.Gender ? "Male" : "Female"}</p>
      {props.user.Id === userLogged.Id ? (
        <p>My Friends({friends.length})</p>
      ) : (
        <p>
          {props.user.UserName} Friends({friends.length})
        </p>
      )}
      {friends.map((friend) => (
        <UserCard
          key={friend.Id}
          Id={friend.Id}
          ProfileImgUrl={friend.ProfileImgUrl}
          UserName={friend.UserName}
        />
      ))}
      {props.user.Id === userLogged.Id ? (
        <button onClick={seePendingFriendsRequests}>
          Pending Friend Requests
        </button>
      ) : null}
    </div>
  );
}
