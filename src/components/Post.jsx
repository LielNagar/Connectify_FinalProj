import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import { PostContext } from "../context/PostContext";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

export default function Post(props) {
  const [likes, setlikes] = useState(props.likes || 0);
  const [isLiked, setIsLiked] = useState(props.isLiked || false);
  const [isFav, setisFav] = useState(props.isFav || false);
  const [profilerSrc, setProfilerSrc] = useState("");

  const {
    setAsLiked,
    setAsFav,
    setAsUnFav,
    setAsUnLiked,
    deletePost,
    setPosts,
  } = useContext(PostContext);

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
      if (data) setProfilerSrc( Object.entries(data)[Object.keys(data).length - 1][1].Img);
    });
  }, [props.publisherId]);

  return (
    <div className="post">
      <div className="image-container">
        <img
          src={
            profilerSrc
              ? profilerSrc
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
          }
          style={{ width: "150px", height: "100px", borderRadius:'50%' }}
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
          {props.userId === props.publisherId && (
            <DeleteOutlineSharpIcon
              onClick={() => {
                deletePost(props.id);
                setPosts((prevPosts) => {
                  const newPosts = prevPosts.filter(
                    (post) => post.Id !== props.id
                  );
                  return newPosts;
                });
              }}
            />
          )}
        </CardActions>
      </div>
    </div>
  );
}
