import React, { useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const ConnectionContext = createContext();

export default function ConnectionContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [penders, setPenders] = useState([]);

  const deleteFriendship = (currentId, otherUserId, userName) => {
    axios
      .delete(
        `/cgroup2/test2/tar1/api/Users/friend/${currentId}/${otherUserId}`
      )
      .then((response) => {
        if (response.status === 200)
          return Swal.fire(
            "Friendship deleted!",
            `You and ${userName} are no longer friends!`,
            "success"
          ).then(() => {
            const newReq = requests.filter((req) => {
              return !(
                (req.User1_id === currentId && req.User2_id === otherUserId) ||
                (req.User2_id === currentId && req.User1_id === otherUserId)
              );
            });
            setRequests(newReq);
          });
      });
  };

  const cancelFriendRequest = (currentId, otherUserId, userName) => {
    axios
      .delete(
        `/cgroup2/test2/tar1/api/Users/friend/${currentId}/${otherUserId}`
      )
      .then((response) => {
        if (response.status === 200)
          return Swal.fire(
            "Friendship deleted!",
            `You cancel the friend request for ${userName}!`,
            "success"
          ).then(() => {
            const newReq = requests.filter((req) => {
              return !(
                req.User1_id === currentId && req.User2_id === otherUserId
              );
            });
            setRequests(newReq);
          });
      });
  };

  const confirmFriendRequest = (currentId, otherUserId, userName) => {
    axios
      .put(
        `/cgroup2/test2/tar1/api/Users/friend/${currentId}/${otherUserId}`
      )
      .then((response) => {
        if (response.status === 200)
          return Swal.fire(
            "So good to have friends!",
            `You and ${userName} are now friends!`,
            "success"
          );
      })
      .then(() => {
        axios
          .get(`/cgroup2/test2/tar1/api/Users/${currentId}/requests`)
          .then((response) => {
            setRequests(response.data);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.log(error.response.data);
            }
          });
      });
  };

  const denyFriendRequest = (currentId, otherUserId, userName) => {
    axios
      .delete(
        `/cgroup2/test2/tar1/api/Users/friend/${currentId}/${otherUserId}`
      )
      .then((response) => {
        if (response.status === 200)
          return Swal.fire(
            "Why so serious?!",
            `You cancelled ${userName} friend request!`,
            "success"
          );
      })
      .then(() => {
        const newReq = requests.filter((req) => {
          return !(req.User2_id === currentId && req.User1_id === otherUserId);
        });
        setRequests(newReq);
      });
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

  const addFriend = (currentId, otherUserId, userName) => {
    axios
      .post(
        `/cgroup2/test2/tar1/api/Users/friend/${currentId}/${otherUserId}`
      )
      .then((response) => {
        if (response.status === 201)
          return Swal.fire(
            "Holding fingers for approval...",
            `You sent a friend request to ${userName}!`,
            "success"
          ).then(() => {
            const req = {
              Status: "PENDING",
              User1_id: currentId,
              User2_id: otherUserId,
            };
            setRequests([...requests, req]);
          });
      });
  };


  return (
    <ConnectionContext.Provider
      value={{
        users,
        setUsers,
        requests,
        setRequests,
        deleteFriendship,
        cancelFriendRequest,
        confirmFriendRequest,
        denyFriendRequest,
        addFriend,
        currentUser,
        setCurrentUser,
        calculateAge,
        penders,
        setPenders,
      }}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
}
