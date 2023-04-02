import React from "react";

import Notification from "./Notification";

export default function Dashboard(props) {
  return (
    <div style={{ float: "left", marginTop: 100, width: "25%" }}>
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Arial",
          color: "#b4590e",
          borderBottom: "1px solid #b4590e",
        }}
      >
        Dashboard
      </h2>
      <Notification currentUserId={props.currentUserId} />
    </div>
  );
}
