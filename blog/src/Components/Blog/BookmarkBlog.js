import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div onClick={handleBookmarkBlog}>
        <FontAwesomeIcon
          icon="fa-solid fa-bookmark"
          style={{
            color: `${isBlogBookmarked ? "blue" : "black"}`,
            fontSize: "25px",
          }}
        />
        {isBlogBookmarked ? <p>Bookmarked</p> : <p>Bookmark</p>}
      </div>
    </>
  );
};

export default BookmarkBlog;
