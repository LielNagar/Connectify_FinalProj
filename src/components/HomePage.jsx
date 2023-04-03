import React, { useContext } from "react";

//COMPONENTS
import { ConnectionContext } from "../context/ConnectionContext";
// import Menu from "./Menu";
// import LiveChat from "./chat/LiveChat";
// import Dashboard from "./Dashboard";
// import DataPosts from "./DataPosts";
import Feed from "./Feed";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";

export default function HomePage() {
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));

  return (
    <>
      <Topbar />
      <div style={{display:'flex', width:'100%'}}>
        <Sidebar currentUserId={currentUser.Id}/>
        <Feed feed={true}/>
        <Rightbar/>
      </div>
    </>
  );
}
