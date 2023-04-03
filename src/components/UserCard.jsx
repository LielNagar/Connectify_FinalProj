import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import { ConnectionContext } from "../context/ConnectionContext";

import Button from "@mui/material/Button";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

export default function UserCard(props) {
  const [userImage, setUserImage] = useState(null);
  const {
    deleteFriendship,
    cancelFriendRequest,
    confirmFriendRequest,
    addFriend,
    denyFriendRequest,
    calculateAge,
  } = useContext(ConnectionContext);

  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + props.id);
    onValue(userPic, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log("heasd");
        if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
          setUserImage(
            Object.entries(data)[Object.keys(data).length - 1][1].Img
          );
        }
      } else {
        setUserImage(null);
      }
    });
    console.log(props.id);
    console.log(userImage);
  }, [props.id, setUserImage, userImage]);
  if (props.search) {
    return (
      <div
        className="UserCardSearch"
        style={{
          borderRadius: "10px",
          height: 90,
          border: "1px solid black",
          width: "75%",
          marginTop: "5px",
          marginBottom: "25px",
          marginLeft: "12px",
        }}
      >
        <img
          alt=""
          src={
            userImage
              ? userImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
          }
          style={{
            width: 70,
            height:70,
            borderRadius: 10,
          }}
        />
        <Link
          to={`/Profile/${props.id}`}
          style={{
            textDecoration: "none",
            fontFamily: "Arial",
            fontSize: "20px",
            paddingBottom: "7px",
            marginBottom: "20px",
            marginLeft: "6px",
            borderRight: "4px solid black",
          }}
        >
          {props.name}
        </Link>
        <span style={{ marginLeft: "6px" }}>
          Age: {calculateAge(props.birthday)}
        </span>
        <span style={{ marginLeft: "6px" }}>
          Gender: {props.gender === 0 ? "Female" : "Male"}
        </span>
        <span style={{ marginLeft: "6px", marginRight: 20 }}>Location: {props.location}</span>
        {/*HERE ARE THE OPTION FOR USER CARD WITH SOME FRIEND REQUEST:
            THE FIRST OPTION IS THAT YOU AND THE USER ARE FRIENDS, U HAVE THE OPTION TO CANCEL THE FRIENDSHIP.
            THE SECOND OPTION IS THAT YOU SENT THE USER A FRIEND REQUEST AND HE YET TO TAKE AN ACTION.
            THE THIRD OPTION IS THAT THE USER IN THE CARD SENT YOU A FRIEND REQUEST AND YOU YET TO TAKE AN ACTION. YOU HAVE THE OPTION EITHER TO ACCEPT OR DENY
            THE FINAL OPTION IS THE YOU AND THE USER ARENT FRIENDS AND NO REQUEST HAS BEEN RECORDED.
        */}
        {props.status === "APPROVED" ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            style={{ backgroundColor: "green", marginBottom: "3px" }}
            onClick={() =>
              deleteFriendship(props.currentId, props.id, props.name)
            }
          >
            DELETE FRIEND
          </Button>
        ) : props.status === "PENDING" ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            style={{ backgroundColor: "green", marginBottom: "3px" }}
            onClick={() =>
              cancelFriendRequest(props.currentId, props.id, props.name)
            }
          >
            CANCEL FRIEND REQUEST
          </Button>
        ) : props.status === "NEED ACTION" ? (
          <>
            <CheckSharpIcon
              style={{ border: "1px solid green", borderRadius: "50%" }}
              color="success"
              onClick={() =>
                confirmFriendRequest(props.currentId, props.id, props.userName)
              }
            />
            <ClearSharpIcon
              style={{
                border: "1px solid red",
                borderRadius: "50%",
                marginLeft: 5,
              }}
              sx={{ color: "red" }}
              onClick={() =>
                denyFriendRequest(props.currentId, props.id, props.userName)
              }
            />
          </>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="success"
            style={{ backgroundColor: "green", marginBottom: "3px" }}
            onClick={() => addFriend(props.currentId, props.id, props.name)}
          >
            Add friend
          </Button>
        )}
      </div>
    );
  }

  return (
    //CASE FOR USER CARD IN PROFILE DETAILS
    <div
      className="UserCard"
      style={{ border: "1px solid black", marginTop: "5px" }}
    >
      <img
        alt=""
        src={props.profileImgUrl}
        style={{
          width: "20px",
          borderRadius: 10,
          marginTop: "2px",
          marginLeft: "2px",
        }}
      />
      <Link
        to={`/Profile/${props.Id}`}
        style={{
          marginLeft: "6px",
          borderRight: "6px solid black",
          paddingRight: 10,
          textDecoration: "none",
        }}
      >
        {props.UserName}
      </Link>
    </div>
  );
}
