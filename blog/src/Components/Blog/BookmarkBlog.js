import React, { useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";

const BookmarkBlog = ({ blogId }) => {
  const [isBlogBookmarked, setIsBlogBookmarked] = useState();

  const handleBookmarkBlog = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && blogId) {
      try {
        const response = await api.post("/bookmark-blog", { token, blogId });

        if (response.data.success) {
          setIsBlogBookmarked(response.data.isBlogLike);
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
    <div onClick={handleBookmarkBlog}>
      <i
        class="fa-solid fa-bookmark fa-2x"
        style={{
          cursor: "pointer",
          color: `${isBlogBookmarked ? "red" : "black"}`,
          // color: "red",
        }}
      ></i>
      <p>Bookmark</p>
    </div>
  );
};

export default BookmarkBlog;
