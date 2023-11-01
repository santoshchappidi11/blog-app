import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../Context/AuthContext";

const BookmarkBlog = ({ blogId, bookmarks }) => {
  const { state } = useContext(AuthContexts);
  const [isBlogBookmarked, setIsBlogBookmarked] = useState();
  // console.log(isBlogBookmarked, "bookmarked");

  useEffect(() => {
    for (let i = 0; i < bookmarks?.length; i++) {
      if (bookmarks[i] == state?.currentUser?.userId) {
        setIsBlogBookmarked(true);
      } else {
        setIsBlogBookmarked(false);
      }
    }
  }, [state, bookmarks]);

  const handleBookmarkBlog = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && blogId) {
      try {
        const response = await api.post("/bookmark-blog", { token, blogId });

        if (response.data.success) {
          setIsBlogBookmarked(response.data.isBlogBookmarked);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please Login to add it in bookmarks!");
    }
  };

  return (
    <>
      {isBlogBookmarked ? (
        <div onClick={handleBookmarkBlog}>
          <i class="fa-solid fa-bookmark fa-2x"></i>
          <p>Bookmarked</p>
        </div>
      ) : (
        <div onClick={handleBookmarkBlog}>
          <i class="fa-regular fa-bookmark fa-2x"></i>
          <p>Bookmark</p>
        </div>
      )}
    </>
  );
};

export default BookmarkBlog;
