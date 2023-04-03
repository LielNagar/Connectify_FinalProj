import React, { useEffect, useState } from "react";
import { RssFeed, Chat, Bookmark, Event } from "@mui/icons-material";
// import {Users} from "../../dummyData"
import CloseFriend from './CloseFriend'

import "../styles/sidebar.css";
import axios from "axios";

export default function Sidebar(props) {
    const [friends, setFriends] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:53653/api/Users/${props.currentUserId}/Friends`).then((response)=> {
            if(response.status===200) setFriends(response.data)
        })
    }, [props.currentUserId])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
            {friends.map((user)=>{
                console.log('mapping');
                return <CloseFriend key={user.Id} user={user}/>
            })}
        </ul>
      </div>
    </div>
  );
}
