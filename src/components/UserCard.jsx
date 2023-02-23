import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ConnectionContext } from "./ConnectionContext";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserCard(props) {
  const { requests, setRequests } = useContext(ConnectionContext);

  if (props.search)
    //CASE USER FOR SEARCH
    return (
      <div
        className="UserCard"
        style={{
          border: "1px solid black",
          width: "50%",
          margin: "auto",
          marginTop: "5px",
        }}
      >
        <img
          src="data:image/png;base64,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"
          style={{
            width: "20px",
            borderRadius: 10,
            marginTop: "2px",
            marginLeft: "2px",
          }}
        />
        <a style={{ marginLeft: "6px", borderRight: "6px solid black" }}>
          {props.name}
        </a>
        <span style={{ marginLeft: "6px" }}>Age:</span>
        <span style={{ marginLeft: "6px" }}>Gender:</span>
        <span style={{ marginLeft: "6px" }}>Common Friends:</span>
        <span>id: {props.id}</span>
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
            onClick={() => {
              axios
                .delete(
                  `http://localhost:53653/api/Users/friend/${props.currentId}/${props.id}`
                )
                .then((response) => {
                  if (response.status === 200)
                    return Swal.fire(
                      "Friendship deleted!",
                      `You and ${props.name} are no longer friends!`,
                      "success"
                    ).then(() => {
                      const newReq = requests.filter((req) => {
                        return !(
                          (req.User1_id === props.currentId &&
                            req.User2_id === props.id) ||
                          (req.User2_id === props.currentId &&
                            req.User1_id === props.id)
                        );
                      });
                      setRequests(newReq);
                    });
                });
            }}
          >
            DELETE FRIEND
          </Button>
        ) : props.status === "PENDING" ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            style={{ backgroundColor: "green", marginBottom: "3px" }}
            onClick={() => {
              axios
                .delete(
                  `http://localhost:53653/api/Users/friend/${props.currentId}/${props.id}`
                )
                .then((response) => {
                  if (response.status === 200)
                    return Swal.fire(
                      "Friendship deleted!",
                      `You cancel the friend request for ${props.name}!`,
                      "success"
                    ).then(() => {
                      const newReq = requests.filter((req) => {
                        return !(
                          req.User1_id === props.currentId &&
                          req.User2_id === props.id
                        );
                      });
                      setRequests(newReq);
                    });
                });
            }}
          >
            CANCEL FRIEND REQUEST
          </Button>
        ) : props.status === "NEED ACTION" ? (
          <div>
            <Button
              variant="contained"
              size="small"
              color="success"
              style={{ backgroundColor: "green", marginBottom: "3px" }}
              onClick={() => {
                axios
                  .put(
                    `http://localhost:53653/api/Users/friend/${props.currentId}/${props.id}`
                  )
                  .then((response) => {
                    if (response.status === 200)
                      return Swal.fire(
                        "So good to have friends!",
                        `You and ${props.name} are now friends!`,
                        "success"
                      );
                  })
                  .then(() => {
                    axios
                      .get(
                        `http://localhost:53653/api/Users/${props.currentId}/requests`
                      )
                      .then((response) => {
                        setRequests(response.data);
                      })
                      .catch((error) => {
                        if (error.response.status === 404) {
                          console.log(error.response.data);
                        }
                      });
                  });
              }}
            >
              CONFIRM
            </Button>
            <Button
              variant="contained"
              size="small"
              color="success"
              style={{ backgroundColor: "green", marginBottom: "3px" }}
              onClick={() => {
                axios
                  .delete(
                    `http://localhost:53653/api/Users/friend/${props.currentId}/${props.id}`
                  )
                  .then((response) => {
                    if (response.status === 200)
                      return Swal.fire(
                        "Why so serious?!",
                        `You cancelled ${props.name} friend request!`,
                        "success"
                      );
                  })
                  .then(() => {
                    const newReq = requests.filter((req) => {
                      return !(
                        req.User2_id === props.currentId &&
                        req.User1_id === props.id
                      );
                    });
                    setRequests(newReq);
                  });
              }}
            >
              DENY
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="success"
            style={{ backgroundColor: "green", marginBottom: "3px" }}
            onClick={() => {
              axios
                .post(
                  `http://localhost:53653/api/Users/friend/${props.currentId}/${props.id}`
                )
                .then((response) => {
                  if (response.status === 201)
                    return Swal.fire(
                      "Holding fingers for approval...",
                      `You sent a friend request to ${props.name}!`,
                      "success"
                    ).then(() => {
                      const req = {
                        Status: "PENDING",
                        User1_id: props.currentId,
                        User2_id: props.id,
                      };
                      setRequests([...requests, req]);
                    });
                });
            }}
          >
            Add friend
          </Button>
        )}
      </div>
    );
  else if (props.pending) {
    //CASE USER IS PENDING REQUEST
    return (
      <div>
        <img
          src="data:image/png;base64,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"
          style={{
            width: "20px",
            borderRadius: 10,
            marginTop: "2px",
            marginLeft: "2px",
          }}
        />
        <a style={{ marginLeft: "6px", borderRight: "6px solid black" }}>
          {props.name}
        </a>
        <span style={{ marginLeft: "6px" }}>Age:</span>
        <span style={{ marginLeft: "6px" }}>Gender:</span>
        <span style={{ marginLeft: "6px" }}>Common Friends:</span>
        <button
          onClick={() => {
            axios.put(
              `http://localhost:53653/api/Users/friend/${props.currentId}/${props.id}`
            );
          }}
        >
          Confirm
        </button>
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
