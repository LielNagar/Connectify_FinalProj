import React, { useContext } from "react";

//COMPONENTS
import { ConnectionContext } from "../context/ConnectionContext";
import Menu from "./Menu";
import LiveChat from "./chat/LiveChat";
import Dashboard from "./Dashboard";
import DataPosts from "./DataPosts";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function HomePage() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar currentUserId={currentUser.Id}/>
      </div>
    </>
  );
}
