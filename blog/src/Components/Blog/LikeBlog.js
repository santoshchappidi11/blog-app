import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../Context/AuthContext";
// import { useParams } from "react-router-dom";

const LikeBlog = ({ blogId, likes }) => {
  const { state } = useContext(AuthContexts);
  const [isBlogLiked, setIsBlogLiked] = useState();
  //   const { blogId } = useParams();

  useEffect(() => {
    for (let i = 0; i < likes?.length; i++) {
      if (likes[i] == state?.currentUser?.userId) {
        setIsBlogLiked(true);
      } else {
        setIsBlogLiked(false);
      }
    }
  }, [state, likes]);

  const handleLikeUnlike = async () => {
    // console.log("clikced");
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && blogId) {
      try {
        const response = await api.post("/like-unlike-blog", { token, blogId });

        if (response.data.success) {
          setIsBlogLiked(response.data.isBlogLike);
          toast.success(response.data.message);
        } else {
          // setIsUserLiked(response.data.isBlogLike);
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please Login to like the blog!");
    }
  };

  return (
    <>
      {isBlogLiked ? (
        <div onClick={handleLikeUnlike}>
          <i class="fa-solid fa-heart fa-2x"></i>
          <p>UnLike</p>
        </div>
      ) : (
        <div onClick={handleLikeUnlike}>
          <i class="fa-regular fa-heart fa-2x"></i>
          <p>Like</p>
        </div>
      )}
    </>
  );
};

export default LikeBlog;
