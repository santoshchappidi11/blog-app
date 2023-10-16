import React, { useEffect, useState } from "react";
import "./Home.css";
import toast from "react-hot-toast";
import api from "../../ApiConfig";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await api.get("/get-all-blogs", getAllBlogs);

        if (response.data.success) {
          setAllBlogs(response.data.allBlogs);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div id="home-screen">
      <div id="home-header">
        <div id="home-header-left">
          <div id="search">
            <i class="fa-solid fa-magnifying-glass fa-xl"></i>
            <input type="text" placeholder="Search blogs..." />
          </div>
        </div>
        <div id="home-header-right">
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
      <div id="home-body">
        <div id="all-blogs">
          {allBlogs?.length ? (
            allBlogs?.map((blog) => (
              <div id="single-blog" key={blog._id}>
                <div id="main-img">
                  <div id="blog-img">
                    <img src={blog.image} alt="blog" />
                  </div>
                </div>
                <div id="blog-details">
                  <div id="blog-title">
                    <h4>{blog.title}</h4>
                  </div>
                  <div id="blog-desc">
                    <p>
                      {blog.description.slice(0, 200)}... <span>Read More</span>
                    </p>
                  </div>
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

export default Home;
