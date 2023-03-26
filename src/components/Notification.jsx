import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UserCardPending from "./UserCardPending";

export default function Notification(props) {
  const [birthdayCelebrators, setBirthdayCelebrators] = useState([]);
  const [penders, setPenders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${props.currentUserId}/dashboard`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          let celebrators = response.data.filter(
            (user) => user.Location === null
          );
          let penders = response.data.filter((user) => user.Location !== null);
          setBirthdayCelebrators(celebrators);
          setPenders(penders);
        }
      })
      .catch((error) => setError(error));
  }, [props.currentUserId]);

  return (
    <div>
      current user{props.currentUserId}
      {error && <p style={{textAlign:'center', fontWeight:'bold'}}>{error.response.data}</p>}
      {birthdayCelebrators &&
        birthdayCelebrators.map((celebrator) => {
          return (
            <div key={celebrator.Id}>
              <p>
                Your friend{" "}
                <Link to={`/Profile/${celebrator.Id}`}>
                  {celebrator.UserName}
                </Link>{" "}
                have a birthday today, wish him best!
              </p>
            </div>
          );
        })}
      {penders &&
        penders.map((pender) => (
          <UserCardPending
            key={pender.Id}
            id={pender.Id}
            userName={pender.UserName}
            gender={pender.Gender}
            currentId={props.currentUserId}
          />
        ))}
    </div>
  );
}
