import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import { PostContext } from "../context/PostContext";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Post(props) {
  const [likes, setlikes] = useState(props.likes || 0);
  const [isLiked, setIsLiked] = useState(props.isLiked || false);
  const [isFav, setisFav] = useState(props.isFav || false);
  const [profilerSrc, setProfilerSrc] = useState("");

  const { setAsLiked, setAsFav, setAsUnFav, setAsUnLiked } =
    useContext(PostContext);

  const formatDateTimeForPost = (datetime) => {
    datetime = new Date(datetime);
    return (
      datetime.toDateString() + "\n" + datetime.toLocaleTimeString("it-IT")
    );
  };

  useEffect(() => {
    const db = getDatabase();
    const userPic = ref(db, "users/" + props.publisherId);
    onValue(userPic, (snapshot) => {
      const data = snapshot.val();
      if(data) setProfilerSrc(Object.entries(data)[0][1].Img);
    });
  }, [props.publisherId]);

  return (
    <div className="post">
      <div className="image-container">
        <img
          src={
            profilerSrc
              ? profilerSrc
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
          }
          style={{ width: "150px", height: "100px" }}
          alt="No Pic"
        />
      </div>
      <div className="details-container">
        <Link
          to={`/Profile/${props.publisherId}`}
          style={{
            textDecoration: "none",
            fontFamily: "Arial",
            fontSize: "20px",
            paddingBottom: "7px",
            marginBottom: "6px",
          }}
        >
          {props.userName}
        </Link>
        <br />
        {formatDateTimeForPost(props.datetime)}
      </div>
      <div className="data-container">
        <span>{props.data}</span>
      </div>
      <div className="options-container">
        <CardActions>
          {isLiked ? (
            <IconButton
              onClick={async () => {
                await setAsUnLiked(props.id, props.userId);
                setlikes((prevLikes) => prevLikes - 1);
                setIsLiked(false);
              }}
            >
              <ThumbUpOffAltRoundedIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton
              onClick={async () => {
                await setAsLiked(props.id, props.userId);
                setlikes((prevLikes) => prevLikes + 1);
                setIsLiked(true);
              }}
            >
              <ThumbUpOffAltIcon color="primary" />
            </IconButton>
          )}
          <span>{likes}</span>
          {isFav ? (
            <StarBorderIcon
              style={{ color: "yellow" }}
              onClick={async () => {
                await setAsUnFav(props.id, props.userId);
                setisFav(!isFav);
              }}
            ></StarBorderIcon>
          ) : (
            <StarBorderIcon
              onClick={async () => {
                await setAsFav(props.id, props.userId);
                setisFav(!isFav);
              }}
            ></StarBorderIcon>
          )}
        </CardActions>
      </div>
    </div>
  );
}
