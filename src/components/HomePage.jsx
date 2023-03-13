import React from "react";
import { useLocation } from "react-router-dom";

//COMPONENTS
import Menu from "./Menu";
import LiveChat from "./LiveChat";
import Dashboard from "./Dashboard";
import DataPosts from "./DataPosts";

export default function HomePage() {
  let { state: user } = useLocation();
  if(!user) user = JSON.parse(localStorage.getItem('userLogged'));

  return (
    <div className="HomePage">
      <Menu user={user} />
      <LiveChat />
      <DataPosts user={user}/>
      <Dashboard />
    </div>
  );
}
