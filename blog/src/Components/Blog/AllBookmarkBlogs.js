import React, { useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./AllBookmarkBlogs.css";

const AllBookmarkBlogs = () => {
  const navigateTo = useNavigate();
  const [bookmarkBlogs, setBookmarkBlogs] = useState([]);

  useEffect(() => {
    const getYourBlogs = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));
      if (token) {
        try {
          const response = await api.post("/get-all-bookmarked-blogs", {
            token,
          });

          if (response.data.success) {
            setBookmarkBlogs(response.data.allBookmarks);
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
            <select defaultValue="All Blogs">
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
                key={blog._id}
                onClick={() => navigateTo(`/single-blog/${blog._id}`)}
              >
                <div id="main-img">
                  <div id="blog-img">
                    <img src={blog.image1} alt="blog" />
                  </div>
                </div>
                <div id="blog-details">
                  <div id="blog-title">
                    <h4>{blog.title}</h4>
                  </div>
                  <div id="blog-desc">
                    <p>
                      {blog.description1.slice(0, 200)}...{" "}
                      <span>Read More</span>
                    </p>
                  </div>
                </div>
                <div id="blog-category">
                  <button>{blog.category}</button>
                </div>
              </div>
            ))
          ) : (
            <p>No Blogs found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookmarkBlogs;
