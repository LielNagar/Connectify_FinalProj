import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Notification(props) {
  const [birthdayCelebrators, setBirthdayCelebrators] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${props.currentUserId}/birthday`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [props.currentUserId]);
  return (
    <div>
      {props.currentUserId}
      <p>{birthdayCelebrators.length}</p>
    </div>
  );
}
