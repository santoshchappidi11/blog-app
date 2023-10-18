import React, { useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

const LikeBlog = ({ blogId }) => {
  const [isBlogLiked, setIsBlogLiked] = useState();
  //   const { blogId } = useParams();

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
    }
  };

  return (
    <div onClick={handleLikeUnlike}>
      <i
        class="fa-solid fa-heart fa-2x"
        style={{
          cursor: "pointer",
          color: `${isBlogLiked ? "red" : "black"}`,
          // color: "red",
        }}
      ></i>
      <p>Like</p>
    </div>
  );
};

export default LikeBlog;
