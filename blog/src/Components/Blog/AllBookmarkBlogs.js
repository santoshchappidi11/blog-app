import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./AllBookmarkBlogs.css";
import { AuthContexts } from "../Context/AuthContext";

const AllBookmarkBlogs = () => {
  const { state } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [bookmarkBlogs, setBookmarkBlogs] = useState();
  // const [categoryValue, setCategoryValue] = useState();

  // const handleCategoryValue = (e) => {
  //   setCategoryValue(e.target.value);
  // };

  useEffect(() => {
    if (!state?.currentUser?.name) {
      navigateTo("/");
    }
  }, [state, navigateTo]);

  useEffect(() => {
    //   if (categoryValue == "All") {
    //     setCategoryValue("");
    //   } else {
    //     setCategoryValue(categoryValue);
    // }

    const getYourBlogs = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));
      if (token) {
        try {
          const response = await api.post("/get-all-bookmarked-blogs", {
            token,
          });

          if (response.data.success) {
            setBookmarkBlogs(response?.data?.allBookmarks);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };
    getYourBlogs();
  }, []);

  return (
    <div id="bookmark-blogs-screen">
      <div id="bookmark-blogs-header">
        <div id="bookmark-blogs-header-left">
          <div id="search">
            <i class="fa-solid fa-magnifying-glass fa-xl"></i>
            <input type="text" placeholder="Search blogs..." />
          </div>
        </div>
        <div id="bookmark-blogs-header-right">
          <div id="blogs-category">
            <p>Category :</p>
            <select
              name="filter"
              // onChange={handleCategoryValue}
              // value={categoryValue}
            >
              <option>All</option>
              <option>Food</option>
              <option>Technology</option>
              <option>Automobiles</option>
            </select>
          </div>
        </div>
      </div>
      <div id="bookmark-blogs-body">
        <div id="all-blogs">
          {bookmarkBlogs?.length ? (
            bookmarkBlogs?.map((blog) => (
              <div
                id="single-blog"
                key={blog?._id}
                onClick={() => navigateTo(`/single-blog/${blog?._id}`)}
              >
                <div id="main-img">
                  <div id="bookmark-blog-img">
                    <img src={blog?.image1} alt="blog" />
                  </div>
                </div>
                <div id="bookmark-blog-details">
                  <div id="bookmark-blog-title">
                    <h4>{blog?.title}</h4>
                  </div>
                  <div id="bookmark-blog-desc">
                    <p>
                      {blog?.description1?.slice(0, 200)}... <b>Read More</b>
                    </p>
                  </div>
                  <div id="bookmark-blog-category">
                    <button>{blog?.category}</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div id="no-bookmark-blogs">
              <div id="no-bookmark-blogs-msg">
                <h1>NO BLOGS FOUND!</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookmarkBlogs;
