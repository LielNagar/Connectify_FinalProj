import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getDatabase, ref, onValue } from "firebase/database";
import { CiSettings } from "react-icons/ci";

import { ImageContext } from "../context/ImageContext";
import { ConnectionContext } from "../context/ConnectionContext";

import UserCard from "./UserCard";
import UserCardPending from "./UserCardPending";

const MySwal = withReactContent(Swal);

export default function UserDetails(props) {
  const [friends, setFriends] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);

  let { saveImg, userProfileImage, setUserProfileImage } =
    useContext(ImageContext);

  const { calculateAge } = useContext(ConnectionContext);

  const userLogged = JSON.parse(sessionStorage.getItem("userLogged"));

  useEffect(() => {
    if (props.user.Id) {
      axios
        .get(`/cgroup2/test2/tar1/api/Users/${props.user.Id}/Friends`)
        .then((response) => {
          setFriends(response.data);
        })
        .catch((error) => console.log(error));
      const db = getDatabase();
      const userPic = ref(db, "users/" + props.user.Id);
      onValue(userPic, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
            setUserProfileImage(
              Object.entries(data)[Object.keys(data).length - 1][1].Img
            );
          }
        } else {
          setUserProfileImage(null);
        }
      });
    }
  }, [props.user.Id, setUserProfileImage]);

  const seePendingFriendsRequests = () => {
    axios
      .get(`/cgroup2/test2/tar1/api/Users/${props.user.Id}/Friends/Pending`)
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
      {userProfileImage ? (
        <div>
          <img
            style={{ marginTop: 80, width: 250 }}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : userProfileImage
            }
            alt="No Pic"
          />
          {changeProfilePicture ? (
            <div>
              {selectedImage ? (
                <div>
                  <button onClick={() => setSelectedImage("")}>Remove</button>
                  <button
                    onClick={(event) => {
                      saveImg(selectedImage, props.user.Id);
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
              <button
                onClick={() => {
                  setChangeProfilePicture(false);
                  setSelectedImage(null);
                }}
              >
                Cancel
              </button>
            </div>
          ) : props.user.Id === userLogged.Id ? (
            <div>
              <button onClick={() => setChangeProfilePicture(true)}>
                Change Profile Picture
              </button>
              <CiSettings
                style={{
                  marginTop: 20,
                  display: "inline",
                  position: "absolut",
                  left: 220,
                  marginRight: 50,
                }}
                onClick={() => alert("settings")}
                size="32px"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <img
            style={{ marginTop: 80, width: 250 }}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
            }
            alt="No Pic"
          ></img>{" "}
          <br />
          <br />
          {selectedImage ? (
            <div>
              <button onClick={() => setSelectedImage("")}>Remove</button>
              <button
                onClick={(event) => saveImg(selectedImage, props.user.Id)}
              >
                Save
              </button>
              <br />
              <br />
            </div>
          ) : null}
          {props.user.Id === userLogged.Id ? (
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          ) : null}
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
