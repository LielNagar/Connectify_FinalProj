import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import { PostContext } from "../context/PostContext";
import { TbThumbUpFilled } from "react-icons/tb";
import { FiThumbsUp } from "react-icons/fi";
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

  const { setAsLiked, setAsFav, setAsUnFav, setAsUnLiked, deletePost } =
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
      if (data)
        setProfilerSrc(
          Object.entries(data)[Object.keys(data).length - 1][1].Img
        );
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
          style={{ width: "150px", height: "100px", borderRadius: "50%" }}
          alt="No Pic"
        />
      </div>
      <div style={{ float: "left", height: "100%", width: "40%" }}>
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
        <div className="options-container">
          <CardActions>
            {isLiked ? (
              <IconButton
                style={{ zIndex: 100 }}
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
            {(props.onWall === props.userId ||
              props.userId === props.publisherId) && (
              <DeleteOutlineSharpIcon
                onClick={() => {
                  deletePost(props.id);
                }}
              />
            )}
          </CardActions>
        </div>
      </div>
      <div className="data-container">
        <span>{props.data}</span>
      </div>
    </div>
    // <div style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
    //   <div style={{ float: 'left', width: '150px', height: '250px' }}>
    //     <img src="picture.jpg" alt="Post picture" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    //   </div>
    //   <div style={{ float: 'left', width: 'calc(100% - 150px)', height: '250px' }}>
    //     <div style={{ height: '200px', padding: '10px' }}>
    //       <h2>Post details</h2>
    //       <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</span>
    //     </div>
    //     <div style={{ height: '50px', padding: '10px' }}>
    //       <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>Read More</button>
    //     </div>
    //   </div>
    //   <div style={{ float: 'left', width: '30%', height: 'auto', padding: '10px' }}>
    //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
    //   </div>
    // </div>
  );
}
