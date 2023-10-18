import React, { useEffect, useState } from "react";
import "./Home.css";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const navigateTo = useNavigate();
  const [title, setTitle] = useState("");
  const [categoryValue, setCategoryValue] = useState({ filter: "" });

  console.log(categoryValue.filter, "category here");

  const handleCategoryValue = (e) => {
    setCategoryValue({ [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (allBlogs?.length && categoryValue.filter != "All") {
  //     const finalBlogs = allBlogs?.filter(
  //       (item) => item.category == categoryValue.filter
  //     );

  //     setAllBlogs(finalBlogs);
  //   }
  // }, [allBlogs, categoryValue]);

  const handleSearchValue = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await api.post("/get-all-blogs", { title });

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
  }, [title]);

  return (
    <div id="home-screen">
      <div id="home-header">
        <div id="home-header-left">
          <div id="search">
            <i class="fa-solid fa-magnifying-glass fa-xl"></i>
            <input
              type="text"
              placeholder="Search blogs..."
              onChange={handleSearchValue}
              value={title}
            />
          </div>
        </div>
        <div id="home-header-right">
          <div id="blogs-category">
            <p>Category :</p>
            <select
              name="filter"
              onChange={handleCategoryValue}
              value={categoryValue.filter}
            >
              <option>All</option>
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

export default Home;
