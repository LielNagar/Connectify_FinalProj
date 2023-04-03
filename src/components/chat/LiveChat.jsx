import React from "react";

import ChatSideBar from "./ChatSideBar";
import Chat from "./Chat";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

export default function LiveChat() {

  return (
    <>
    <Topbar />
    <div style={{width:'100%', display:'flex', height:'100%'}}>
    <Sidebar />
    <ChatSideBar />
      <Chat />
    </div>
    </>
  );
}
