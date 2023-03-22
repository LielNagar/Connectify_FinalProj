import React from "react";
import { useLocation } from "react-router-dom";

//COMPONENTS
import Menu from "./Menu";
import LiveChat from "./chat/LiveChat";
import Dashboard from "./Dashboard";
import DataPosts from "./DataPosts";

export default function HomePage() {
  let { state: user } = useLocation();
  if(!user) user = JSON.parse(localStorage.getItem('userLogged'));

  return (
    <div className="homepage">
      <Menu user={user} />
      <LiveChat user={user}/>
      <DataPosts user={user}/>
      <Dashboard currentUserId={user.Id}/>
    </div>
  );
}
