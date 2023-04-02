import React, {useContext} from "react";

//COMPONENTS
import { ConnectionContext } from "../context/ConnectionContext";
import Menu from "./Menu";
import LiveChat from "./chat/LiveChat";
import Dashboard from "./Dashboard";
import DataPosts from "./DataPosts";

export default function HomePage() {
  let {currentUser} = useContext(ConnectionContext)
  if(!currentUser) currentUser = JSON.parse(sessionStorage.getItem('userLogged'));

  return (
    <div className="homepage">
      <Menu />
      <LiveChat />
      <DataPosts />
      <Dashboard currentUserId={currentUser.Id}/>
    </div>
  );
}
