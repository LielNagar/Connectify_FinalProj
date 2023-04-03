import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

import { PostContext } from "../context/PostContext";
import { IoMdThumbsUp } from "react-icons/io";
import { Bookmark } from "@mui/icons-material";
import { FiThumbsUp } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import "../styles/post.css";

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
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/Profile/${props.publisherId}`}
              style={{
                textDecoration: "none",
              }}
            >
              <img
                className="postProfileImg"
                src={
                  profilerSrc
                    ? profilerSrc
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              <Link
                to={`/Profile/${props.publisherId}`}
                style={{
                  textDecoration: "none",
                }}
              >
                {props.userName}
              </Link>
              <br />
            </span>
            <span className="postDate">
              {formatDateTimeForPost(props.datetime)}
            </span>
            <Bookmark className="sidebarIcon" style={{ marginLeft: 20 }} />{" "}
            {/*NEED TO SET BOOKMARK MARGIN AND FUNCTIONALITY*/}
            {(props.onWall === props.userId ||
              props.userId === props.publisherId) && (
              <RiDeleteBinLine
                size={20}
                onClick={() => {
                  deletePost(props.id);
                }}
              />
            )}
          </div>
          {/*<div className="postTopRight">
                <MoreVert />
            </div>*/}
        </div>
        <div className="postCenter">
          <span className="postText">{props.data}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? (
              <IoMdThumbsUp
                size={22}
                color="blue"
                onClick={async () => {
                  await setAsUnLiked(props.id, props.userId);
                  setlikes((prevLikes) => prevLikes - 1);
                  setIsLiked(false);
                }}
              />
            ) : (
              <FiThumbsUp
                size={20}
                color="blue"
                onClick={async () => {
                  await setAsLiked(props.id, props.userId);
                  setlikes((prevLikes) => prevLikes + 1);
                  setIsLiked(true);
                }}
              />
            )}

            <span className="postLikeCounter">{likes} people like it</span>
          </div>
          {/*<div className="postBottomRight">
            <span className="postCommenttext">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
// <div className="post">
// <div className="image-container">
//   <img
//     src={
//       profilerSrc
//         ? profilerSrc
//         : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s"
//     }
//     style={{ width: "150px", height: "100px", borderRadius: "50%" }}
//     alt="No Pic"
//   />
// </div>
// <div style={{ float: "left", height: "100%", width: "40%" }}>
//   <div className="details-container">
// <Link
//   to={`/Profile/${props.publisherId}`}
//   style={{
//     textDecoration: "none",
//     fontFamily: "Arial",
//     fontSize: "20px",
//     paddingBottom: "7px",
//     marginBottom: "6px",
//   }}
// >
//   {props.userName}
// </Link>
// <br />
//     {formatDateTimeForPost(props.datetime)}
//   </div>
//   <div className="options-container">
//     <CardActions>
// {isLiked ? (
//   <IconButton
//     style={{ zIndex: 100 }}
//     onClick={async () => {
//       await setAsUnLiked(props.id, props.userId);
//       setlikes((prevLikes) => prevLikes - 1);
//       setIsLiked(false);
//     }}
//   >
//     <ThumbUpOffAltRoundedIcon color="primary" />
//   </IconButton>
// ) : (
//   <IconButton
//     onClick={async () => {
//       await setAsLiked(props.id, props.userId);
//       setlikes((prevLikes) => prevLikes + 1);
//       setIsLiked(true);
//     }}
//   >
//     <ThumbUpOffAltIcon color="primary" />
//   </IconButton>
// )}
//       <span>{likes}</span>
//       {isFav ? (
//         <StarBorderIcon
//           style={{ color: "yellow" }}
//           onClick={async () => {
//             await setAsUnFav(props.id, props.userId);
//             setisFav(!isFav);
//           }}
//         ></StarBorderIcon>
//       ) : (
//         <StarBorderIcon
//           onClick={async () => {
//             await setAsFav(props.id, props.userId);
//             setisFav(!isFav);
//           }}
//         ></StarBorderIcon>
//       )}
// {(props.onWall === props.userId ||
//   props.userId === props.publisherId) && (
//   <DeleteOutlineSharpIcon
//     onClick={() => {
//       deletePost(props.id);
//     }}
//   />
// )}
//     </CardActions>
//   </div>
// </div>
// <div className="data-container">
//   <span>{props.data}</span>
// </div>
// </div>
