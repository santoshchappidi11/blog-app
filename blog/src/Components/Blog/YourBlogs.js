import React, { useEffect, useState } from "react";
import "./YourBlogs.css";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const YourBlogs = () => {
  const [yourBlogs, setYourBlogs] = useState([]);
  const navigateTo = useNavigate();

  

  useEffect(() => {
    const getYourBlogs = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));
      if (token) {
        try {
          const response = await api.post("/get-your-blogs", { token });

          if (response.data.success) {
            setYourBlogs(response.data.blogs);
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
    <div id="your-blog-screen">
      <div id="your-blog-header">
        <div id="your-blog-header-left">
          <div id="search">
            <i class="fa-solid fa-magnifying-glass fa-xl"></i>
            <input type="text" placeholder="Search blogs..." />
          </div>
        </div>
        <div id="your-blog-header-right">
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
      <div id="your-blog-body">
        <div id="all-blogs">
          {yourBlogs?.length ? (
            yourBlogs?.map((blog) => (
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

export default YourBlogs;
