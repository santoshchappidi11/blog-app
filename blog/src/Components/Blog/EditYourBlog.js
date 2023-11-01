import React, { useEffect, useState } from "react";
import "./EditYourBlog.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../ApiConfig";
import toast from "react-hot-toast";

const EditYourBlog = () => {
  const navigateTo = useNavigate();
  const { editBlogId } = useParams();

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

  useEffect(() => {
    const getEditBlogData = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token && editBlogId) {
        try {
          const response = await api.post("/get-edit-blog-data", {
            token,
            editBlogId,
          });

          if (response.data.success) {
            setBlogData(response.data.blog);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };

    getEditBlogData();
  }, [editBlogId]);

  const handleChangeValues = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleEditBlogSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && editBlogId) {
      if (
        blogData.title ||
        blogData.subtitle ||
        blogData.image1 ||
        blogData.description1 ||
        blogData.category
      ) {
        try {
          const response = await api.post("/update-your-blog", {
            blogData,
            token,
            editBlogId,
          });

          if (response.data.success) {
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
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Please change atleast one field to update your blog!");
      }
    }
  };

  return (
    <div id="edit-blog-screen">
      <div id="edit-blog-header-style">
        <h1>E</h1>
        <h1>D</h1>
        <h1>I</h1>
        <h1>T</h1>
        <br />
        <h1>Y</h1>
        <h1>O</h1>
        <h1>U</h1>
        <h1>R</h1>
        <br/>
        <h1>B</h1>
        <h1>L</h1>
        <h1>O</h1>
        <h1>G</h1>
      </div>
      <div id="edit-blog">
        <div id="edit-blog-header">
          <h1>EDIT YOUR BLOG</h1>
        </div>
        <div id="edit-blog-body">
          <form onSubmit={handleEditBlogSubmit}>
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
            <div id="edit-blog-btn">
              <button type="submit">Update Your Blog</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditYourBlog;
