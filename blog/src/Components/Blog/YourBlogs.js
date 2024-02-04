import React, { useContext, useEffect, useState } from "react";
import "./YourBlogs.css";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";

const YourBlogs = () => {
  const { state } = useContext(AuthContexts);
  const [yourBlogs, setYourBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!state?.currentUser?.name) {
      navigateTo("/");
    }
  }, [state, navigateTo]);

  useEffect(() => {
    const getYourBlogs = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));
      if (token) {
        try {
          const response = await api.post("/get-your-blogs", { token });

          if (response.data.success) {
            setIsLoading(false);
            setYourBlogs(response.data.blogs);
          } else {
            setIsLoading(false);
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
    <>
      {isLoading ? (
        <div id="your-blog-loading">
          <h3>Loading...</h3>
        </div>
      ) : (
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
                  <option>All</option>
                  {yourBlogs?.length &&
                    yourBlogs?.map((blog) => (
                      <>
                        <option key={blog._id}>{blog?.category}</option>
                      </>
                    ))}
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
                          {blog.description1.slice(0, 200)}... <b>Read More</b>
                        </p>
                      </div>
                      <div id="blog-category">
                        <button>{blog.category}</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div id="no-your-blogs">
                  <div id="no-your-blogs-msg">
                    <h1>NO BLOGS FOUND!</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourBlogs;
