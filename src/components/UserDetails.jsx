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
  const [selectedImage, setSelectedImage] = useState(null);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  useEffect(() => {
    console.log("user details render");
    if (props.user.Id) {
      axios
        .get(`http://localhost:53653/api/Users/${props.user.Id}/Friends`)
        .then((response) => {
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

  const toBase64 = (arr) => {
    return btoa(
      arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <div
      className="UserDetails"
      style={{
        float: "left",
        width: "250px",
        height: "100%",
        borderRight: "2px solid #b4590e",
        marginTop: "60px",
        marginBottom: "20px",
      }}
    >
      {props.user.Id === userLogged.Id ? (
        <CiSettings
          style={{
            marginTop: 50,
            display: "inline",
            position: "fixed",
            left: 0,
          }}
          onClick={() => alert("settings")}
          size="32px"
        />
      ) : null}
      {props.user.Avatar ? (
        <div>
          <img
            style={{ marginTop: 80, width: 250 }}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : `data:image/png;base64,${toBase64(props.user.Avatar)}`
            }
            alt='No Pic'
          />
          {changeProfilePicture ? (
            <div>
              {selectedImage ? (
                <div>
                  <button onClick={() => setSelectedImage("")}>Remove</button>
                  <button
                    onClick={(event) => {
                      props.saveImg(selectedImage, props.user.Id);
                      setChangeProfilePicture(false);
                    }}
                  >
                    Save
                  </button>
                  <br />
                  <br />
                </div>
              ) : null}
              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
              <br />
              <button onClick={() => {
                setChangeProfilePicture(false)
                setSelectedImage(null)
              }}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setChangeProfilePicture(true)}>
              Change Profile Picture
            </button>
          )}
        </div>
      ) : (
        <div>
          <img
            style={{ marginTop: 80, width: 250 }}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
            }
            alt= 'No Pic'
          ></img>{" "}
          <br />
          <br />
          {selectedImage ? (
            <div>
              <button onClick={() => setSelectedImage("")}>Remove</button>
              <button
                onClick={(event) => props.saveImg(selectedImage, props.user.Id)}
              >
                Save
              </button>
              <br />
              <br />
            </div>
          ) : null}
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
      )}
      <span>Name: {props.user.UserName ? props.user.UserName : "No Name"}</span>
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
      <p>
        Connections: aka brother of... to be continued....asdada dada dasdas
        dasda s das dasd adasdasd asdasdasda Connections: aka brother of... to
        be continued....asdada dada dasdas dasda s das dasd adasdasd asdasdasdad
        Connections: aka brother of... to be continued....asdada dada dasdas
        dasda s das dasd adasdasd asdasdasdadd
      </p>
    </div>
  );
}
