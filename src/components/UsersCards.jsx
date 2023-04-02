import React, { useEffect, useContext } from "react";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import UserCard from "./UserCard";

export default function UsersCards(props) {
  const { setUsers, requests, setRequests } =
    useContext(ConnectionContext);

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${props.currentId}/requests`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log(error.response.data);
        }
      });
      return (()=>{
        setUsers([])
      })
  }, [setRequests,setUsers,props.currentId]);

  if (props.pending) {
    return (
      <div>
        {props.users.map((user) => (
          <UserCard
            key={user.Id}
            id={user.Id}
            name={user.UserName}
            profileImgUrl={user.ProfileImgUrl}
            pending={true}
            currentId={props.currentId}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {props.users.map((user) => {
        let found = false;
        let needToConfirm = false;
        let i;
        for (i = 0; i < requests.length; i++) {
          if (user.Id === requests[i].User2_id) {
            found = true;
            break;
          }
          if (user.Id === requests[i].User1_id) {
            found = true;
            needToConfirm = true;
            if(requests[i].Status === 'APPROVED') needToConfirm = false;
            break;
          }
        }
        if (found === true)
          return (
            <UserCard
              key={user.Id}
              status={needToConfirm ? "NEED ACTION" : requests[i].Status}
              id={user.Id}
              name={user.UserName}
              location={user.Location}
              profileImgUrl={user.ProfileImgUrl}
              currentId={props.currentId}
              birthday= {user.Birthday}
              gender= {user.Gender}
              search={true}
            />
          );
        else
          return (
            <UserCard
              key={user.Id}
              id={user.Id}
              gender= {user.Gender}
              name={user.UserName}
              location={user.Location}
              birthday= {user.Birthday}
              profileImgUrl={user.ProfileImgUrl}
              currentId={props.currentId}
              search={true}
            />
          );
      })}
    </div>
  );
}
