import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import {
  Login,
  Register,
  addComment,
  bookmarkBlog,
  getAllBookmarkedBlogs,
  getCurrentUser,
  likeUnlikeBlog,
  updateUserDetails,
} from "./Controllers/UserController.js";
import {
  createBlog,
  deleteYourBlog,
  getAllBlogs,
  getEditBlogData,
  getSingleBlog,
  getYourBlogs,
  updateYourBlog,
} from "./Controllers/BlogController.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

// ------------------------------------->
app.post("/register", Register);
app.post("/login", Login);
app.post("/get-current-user", getCurrentUser);
app.post("/update-user-details", updateUserDetails);
app.post("/create-blog", createBlog);
app.post("/update-your-blog", updateYourBlog);
app.post("/get-all-blogs", getAllBlogs);
app.post("/get-single-blog", getSingleBlog);
app.post("/get-your-blogs", getYourBlogs);
app.post("/delete-your-blog", deleteYourBlog);
app.post("/like-unlike-blog", likeUnlikeBlog);
app.post("/bookmark-blog", bookmarkBlog);
app.post("/get-all-bookmarked-blogs", getAllBookmarkedBlogs);
app.post("/add-comment", addComment);
app.post("/get-edit-blog-data", getEditBlogData);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to DB"));

app.listen(8000, () => console.log("listening on port 8000..."));
