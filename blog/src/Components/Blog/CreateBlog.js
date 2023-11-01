import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../ApiConfig";
import "./CreateBlog.css";

const CreateBlog = () => {
  const navigateTo = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    image1: "",
    description1: "",
    image2: "",
    description2: "",
    image3: "",
    description3: "",
    category: "",
  });

  const handleChangeValues = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleCreateBlogSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      if (
        blogData.title &&
        blogData.subtitle &&
        blogData.image1 &&
        blogData.description1 &&
        blogData.category
      ) {
        try {
          const response = await api.post("/create-blog", { blogData, token });

          if (response.data.success) {
            toast.success(response.data.message);
            setBlogData({
              title: "",
              subtitle: "",
              image1: "",
              description1: "",
              image2: "",
              description2: "",
              image3: "",
              description3: "",
              category: "",
            });
            navigateTo("/");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Please fill all the required details!");
      }
    }
  };

  return (
    <div id="create-blog-screen">
      <div id="create-blog-header-style">
        <h1>C</h1>
        <h1>R</h1>
        <h1>E</h1>
        <h1>A</h1>
        <h1>T</h1>
        <h1>E</h1>
        <br/>
        <h1>B</h1>
        <h1>L</h1>
        <h1>O</h1>
        <h1>G</h1>
      </div>
      <div id="create-blog">
        <div id="create-blog-header">
          <h1>CREATE BLOG</h1>
        </div>
        <div id="create-blog-body">
          <form onSubmit={handleCreateBlogSubmit}>
            <div className="fields">
              <label>Blog Title :</label>
              <input
                type="text"
                name="title"
                onChange={handleChangeValues}
                value={blogData.title}
              />
            </div>
            <div className="fields">
              <label>Blog Subtitle :</label>
              <input
                type="text"
                name="subtitle"
                onChange={handleChangeValues}
                value={blogData.subtitle}
              />
            </div>
            <div className="fields">
              <label>Blog Image - 1 :</label>
              <input
                type="text"
                name="image1"
                onChange={handleChangeValues}
                value={blogData.image1}
              />
            </div>
            <div className="fields">
              <label>Blog Description - 1 :</label>
              <input
                type="text"
                name="description1"
                onChange={handleChangeValues}
                value={blogData.description1}
              />
            </div>
            <div className="fields">
              <label>Blog Image - 2 :</label>
              <input
                type="text"
                name="image2"
                onChange={handleChangeValues}
                value={blogData.image2}
              />
            </div>
            <div className="fields">
              <label>Blog Description - 2 :</label>
              <input
                type="text"
                name="description2"
                onChange={handleChangeValues}
                value={blogData.description2}
              />
            </div>
            <div className="fields">
              <label>Blog Image - 3 :</label>
              <input
                type="text"
                name="image3"
                onChange={handleChangeValues}
                value={blogData.image3}
              />
            </div>
            <div className="fields">
              <label>Blog Description - 3 :</label>
              <input
                type="text"
                name="description3"
                onChange={handleChangeValues}
                value={blogData.description3}
              />
            </div>
            <div className="fields">
              <label>Blog Category :</label>
              <input
                type="text"
                name="category"
                onChange={handleChangeValues}
                value={blogData.category}
              />
            </div>
            <div id="create-blog-btn">
              <button type="submit">Create Blog</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
