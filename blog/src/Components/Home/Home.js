import React, { useEffect, useState } from "react";
import "./Home.css";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filterBlogs, setFilterBlogs] = useState([]);
  const navigateTo = useNavigate();
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [categoryValue, setCategoryValue] = useState();
  const [blogsCount, setBlogsCount] = useState();
  const [pageSize, setPageSize] = useState();
  const [pageCount, setPageCount] = useState();

  // console.log(page, "page");
  // console.log(blogsCount, "count");

  useEffect(() => {
    const totalPageCount = Math.ceil(blogsCount / pageSize);
    setPageCount(totalPageCount);
  }, [blogsCount, pageSize]);

  const incrementPage = () => {
    if (page == pageCount) {
      setPage(1);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const decrementPage = () => {
    if (page == 1) {
      setPage(pageCount);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  const handleCategoryValue = (e) => {
    setCategoryValue(e.target.value);
  };

  const handleSearchValue = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (categoryValue == "All") {
      setCategoryValue("");
    } else {
      setCategoryValue(categoryValue);
    }

    const getAllBlogs = async () => {
      try {
        const response = await api.post("/get-all-blogs", {
          title,
          category: categoryValue,
          page,
        });

        if (response.data.success) {
          setAllBlogs(response.data.allBlogs);
          setFilterBlogs(response.data.blogs);
          setBlogsCount(response.data.blogsCount);
          setPageSize(response.data.limit);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getAllBlogs();
  }, [title, categoryValue, page]);

  return (
    <>
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
                value={categoryValue}
              >
                <option>All</option>
                {filterBlogs?.length &&
                  filterBlogs?.map((blog) => (
                    <>
                      <option key={blog._id}>{blog?.category}</option>
                    </>
                  ))}
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
              <div id="no-blogs">
                <div id="no-blogs-msg">
                  <h1>NO BLOGS FOUND!</h1>
                </div>
              </div>
            )}
          </div>
          {/* <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" /> */}
        </div>
      </div>

      <div id="arrows-screen">
        <div id="arrows">
          <div id="left-arrow" onClick={decrementPage}>
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-chevron-left"
              style={{ fontSize: "40px" }}
            />
          </div>
          <div id="right-arrow" onClick={incrementPage}>
            {" "}
            <FontAwesomeIcon
              icon="fa-solid fa-chevron-right"
              style={{ fontSize: "40px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
