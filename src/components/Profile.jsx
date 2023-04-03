import React, { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import axios from "axios";

import { ConnectionContext } from "../context/ConnectionContext";
import { ImageContext } from "../context/ImageContext";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";

import "../styles/profile.css";

export default function Profile() {
    const [user, setUser] = useState({});
  
  let { currentUser } = useContext(ConnectionContext);
  if (!currentUser)
    currentUser = JSON.parse(sessionStorage.getItem("userLogged"));
    const { userProfileId } = useParams();
  let {  userProfileImage, setUserProfileImage,isRender } =
    useContext(ImageContext);

  useEffect(() => {
    axios
      .get(`http://localhost:53653/api/Users/${userProfileId}`)
      .then((response) => {
        setUser(response.data);
      });
      const db = getDatabase();
      const userPic = ref(db, "users/" + userProfileId);
      onValue(userPic, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (Object.entries(data)[Object.keys(data).length - 1][1].Img) {
            setUserProfileImage(
              Object.entries(data)[Object.keys(data).length - 1][1].Img
            );
          }
        } else {
          setUserProfileImage(null);
        }
      });
  }, [userProfileId, isRender,setUserProfileImage]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar currentUserId={currentUser.Id} />
        <div className="profileRight">
          <div className="profilerightTop">
            <div className="profileCover">
              {/*<img className="profileCoverImg" src={userProfileImage} alt="" />*/}
              <img
                className="profileUserImg"
                src={
                  userProfileImage
                    ? userProfileImage
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {user&& user.UserName?.replace(/\b\w/g, (x) => x.toUpperCase())}
              </h4>
              <span className="profileInfoDesc">Hello my friends</span>
            </div>
          </div>
          <div className="profilerightBottom">
            <Feed userProfileId={userProfileId} onWall={userProfileId}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
