import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { PostContext } from "./PostContext";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Post(props) {
  const [likes, setlikes] = useState(props.likes || 0);
  const [isLiked, setIsLiked] = useState(props.isLiked || false);
  const {setAsLiked, setAsFav } = useContext(PostContext);

  const formatDateTimeForPost = (datetime) => {
    datetime = new Date(datetime);
    return (
      datetime.toDateString() + "\n" + datetime.toLocaleTimeString("it-IT")
    );
  };

  return (
    <div className="post">
      <div className="image-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
          style={{ width: "150px", height: "100px" }}
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
          <IconButton
            disabled={isLiked}
            onClick={() => {
              setAsLiked(props.id, props.userId); //VIOLATION OF PRIMARY KEY!
              setlikes((prevLikes) => prevLikes + 1);
              setIsLiked(true);
            }}
          >
            <ThumbUpOffAltIcon color="primary" />
          </IconButton>
          <span>{likes}</span>
          {props.isFav ? (
            <StarBorderIcon style={{ color: "yellow" }}></StarBorderIcon>
          ) : null}
        </CardActions>
      </div>
    </div>
  );
}

// return (
//   <div className="Post">
//     <Card sx={{ maxWidth: 700 }}>
//       <CardMedia
//         component="img"
//         height="200"
//         image={props.profilerSrc}
//         alt={props.userName}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
// <Link
//   to={`/Profile/${props.publisherId}`}
//   style={{ textDecoration: "none" }}
// >
//   {props.userName}
// </Link>
// , {formatDateTimeForPost(props.datetime)}
//         </Typography>
//         <Typography variant="body2">{props.data}</Typography>
//       </CardContent>
// <CardActions>
//   <IconButton onClick={() => setlikes((prevLikes) => prevLikes + 1)}>
//     <ThumbUpOffAltIcon color="primary" />
//   </IconButton>
//   <span>{likes}</span>
// </CardActions>
//     </Card>
//   </div>
// );
