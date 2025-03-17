import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { pink, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch } from "react-redux";
import { createComment, likeComment } from "../../Redux/Comment/comment.action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Divider } from "@mui/material";
import { likePost, savePost } from "../../Redux/Post/post.action";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import moment from "moment";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function PostCard({ item }) {
  const postTimeAgo = moment(item?.createdAt).fromNow();
  const [showComment, setShowComment] = React.useState(false);
  const [showSharePopup, setShowSharePopup] = React.useState(false); // ✅ Share popup state
  const [copySuccess, setCopySuccess] = React.useState(false);
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = React.useState("");

  const postUrl = window.location.href;

  const handleCreateComment = (content) => {
    if (content.trim()) {
      dispatch(createComment({ postId: item?.id, data: { content } }));
      setCommentContent(""); // Clear input after submission
    }
  };

  const handlePostLike = () => {
    dispatch(likePost(item?.id));
  };

  const handleSavePost = () => {
    dispatch(savePost(item?.id));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopySuccess(true);
  };

  return (
    <div className="card" sx={{ w: "100%" }}>
      <CardHeader
        className=""
        avatar={
          <Avatar
            sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }}
            aria-label="recipe"
          >
            {item?.user?.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton color="primary" aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        //   title={item?.user?.firstName + " " + item?.user?.lastName}
        //   subheader={
        //     "@" +
        //     item?.user?.firstName.toLowerCase() +
        //     "_" +
        //     item?.user?.lastName.toLowerCase()
        //   }
        // />
        title={
          <div className="flex items-center">
            <span>{item?.user?.firstName + " " + item?.user?.lastName}</span>
            <span className="text-gray-400 ml-3 text-sm">
              {postTimeAgo}
            </span>{" "}
            {/* ✅ Time Added */}
          </div>
        }
        subheader={
          "@" +
          item?.user?.firstName.toLowerCase() +
          "_" +
          item?.user?.lastName.toLowerCase()
        }
      />
      {/* {item.image && <CardMedia
        component="img"
        height="194"
        image={item?.image}
        alt={item.caption}
      />} */}

      {/* {item?.video && (
        <video controls width="100%">
          <source src={item.video} type="video/mp4" />
          <source src={item.video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )} */}

      {item.video ? (
        <CardMedia
          component="video"
          controls
          loop
          autoPlay
          muted
          //controlsList="nodownload"
          //controlsList="nofullscreen"
          height="194"
          // style={{ height: "500px" }}
          src={item.video}
          alt={item.caption}
        />
      ) : (
        item.image && (
          <CardMedia
            component="img"
            //height="50"
            //style={{ height: "500px" }}
            image={item.image}
            alt={item.caption}
          />
        )
      )}

      <CardContent>
        <Typography variant="body2" color="primary">
          {item?.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton
            color="primary"
            onClick={handlePostLike}
            aria-label="add to favorites"
          >
            {item?.likedByRequser ? (
              <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorderIcon />
            )}

            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              {item?.liked?.length || 0} {/* If no comments, show 0 */}
            </Typography>
          </IconButton>

          <IconButton color="primary" onClick={() => setShowSharePopup(true)}>
            <ShareIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => setShowComment(!showComment)}
          >
            <ChatBubbleOutlineIcon />

            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              {item?.comments?.length || 0} {/* If no comments, show 0 */}
            </Typography>
          </IconButton>
        </div>
        <div>
          <IconButton color="primary" onClick={handleSavePost}>
            {item?.savedByRequser ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComment && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} />
            <input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              onKeyPress={(e) => {
                console.log("e", e.target.value);
                if (e.key === "Enter") {
                  console.log("--------");
                  handleCreateComment(e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment..."
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {item?.comments.map((comment) => (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{
                      height: "2rem",
                      width: "2rem",
                      fontSize: ".8rem",
                      bgcolor: "#212534",
                      color: "rgb(88,199,250)",
                    }}
                  >
                    {comment.user.firstName[0]}
                  </Avatar>
                  <p>{comment.content}</p>
                </div>
                <div>
                  <IconButton color="primary">
                    <FavoriteBorderIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <Dialog open={showSharePopup} onClose={() => setShowSharePopup(false)}>
        <DialogTitle>Share this Post</DialogTitle>
        <DialogContent>
          <p>Copy the link or share on social media:</p>
          <div className="flex gap-3 mt-3">
            <IconButton
              color="primary"
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              color="primary"
              component="a"
              href={`https://twitter.com/intent/tweet?url=${postUrl}`}
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              color="primary"
              component="a"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>

            {/* ✅ WhatsApp Web Open Thase */}
            <IconButton
              color="primary"
              component="a"
              href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                postUrl
              )}`}
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>

            {/* ✅ Copy Link with Notification */}
            <IconButton color="primary" onClick={handleCopyLink}>
              <ContentCopyIcon />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSharePopup(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar for Copy Success */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Successfully Copied!"
      />
    </div>
  );
}

//story views

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import StoryProgressBar from "./StoryProgress";

// const StoryViewerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
//   background-color: rgba(0, 0, 0, 0.9);
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 1000;
// `;

// const StoryContent = styled.div`
//   max-height: 70vh;
//   max-width: 40vw;
//   object-fit: contain;
//   border-radius: 10px;
// `;

// const dummyStories = [
//   {
//     type: "image",
//     url: "https://cdn.pixabay.com/photo/2017/03/05/23/14/girl-2120196_640.jpg",
//     username: "Dummy Image",
//     userId: 0,
//   },
//   {
//     type: "video",
//     url: "https://www.w3schools.com/html/mov_bbb.mp4",
//     username: "Dummy Video",
//     userId: 1,
//   },
//   {
//     type: "image",
//     url: "https://cdn.pixabay.com/photo/2016/07/27/17/56/woman-1545885_640.jpg",
//     username: "User 2",
//     userId: 2,
//   },
//   {
//     type: "video",
//     url: "https://cdn.pixabay.com/video/2016/05/01/2946-164933125_tiny.mp4",
//     username: "User 3",
//     userId: 3,
//   },
// ];

// function StoryViewer({ stories = [], onClose = () => {} }) {
//   const storyList = stories.length > 0 ? stories : dummyStories;
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleNextStory = () => {
//     if (currentStoryIndex < storyList.length - 1) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//       setActiveIndex(activeIndex + 1);
//     } else {
//       // ✅ Redirect to home page after last story
//       window.location.href = "http://localhost:3000/";
//     }
//   };

//   useEffect(() => {
//     let intervalId;
//     const currentStory = storyList[currentStoryIndex];

//     if (currentStory.type === "video") {
//       const videoElement = document.getElementById("story-video");
//       if (videoElement) {
//         videoElement.muted = true;
//         videoElement
//           .play()
//           .catch((error) => console.error("Autoplay failed:", error));
//         videoElement.onended = handleNextStory; // Move to next story when video ends
//       }
//     } else {
//       intervalId = setTimeout(handleNextStory, 5000); // Move to next story after 5 seconds
//     }

//     return () => clearTimeout(intervalId);
//   }, [currentStoryIndex]);

//   return (
//     <StoryViewerContainer>
//       {/* ✅ Story Content (Mix of Image & Video) */}
//       {storyList[currentStoryIndex].type === "video" ? (
//         <StoryContent
//           as="video"
//           id="story-video"
//           src={storyList[currentStoryIndex].url}
//           autoPlay
//           playsInline
//           muted
//         />
//       ) : (
//         <StoryContent
//           as="img"
//           src={storyList[currentStoryIndex].url}
//           alt="story image"
//         />
//       )}

//       {/* ✅ Progress Bar */}
//       <div className="absolute top-5 w-full flex justify-center">
//         {storyList.map((story, index) => (
//           <StoryProgressBar
//             key={index}
//             duration={5000}
//             index={index}
//             activeIndex={activeIndex}
//           />
//         ))}
//       </div>
//     </StoryViewerContainer>
//   );
// }

// export default StoryViewer;
