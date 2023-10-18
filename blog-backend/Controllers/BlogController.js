import jwt from "jsonwebtoken";
import BlogModel from "../Models/BlogModel.js";
import UserModel from "../Models/UserModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find({});

    if (allBlogs?.length) {
      return res.status(200).json({ success: true, allBlogs });
    }

    return res.status(404).json({ success: false, message: "No Blogs!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      image1,
      description1,
      image2,
      description2,
      image3,
      description3,
      category,
    } = req.body.blogData;
    const { token } = req.body;

    if (!title || !subtitle || !image1 || !description1 || !category || !token)
      return res
        .status(404)
        .json({ success: false, message: "All fields are mandatory!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Token not valid!" });

    const userId = decodedData.userId;

    const blog = new BlogModel({
      title,
      subtitle,
      image1,
      description1,
      category,
      userId: userId,
      image2,
      description2,
      image3,
      description3,
    });
    await blog.save();

    return res
      .status(201)
      .json({ success: true, message: "Your blog created successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateYourBlog = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      image1,
      description1,
      image2,
      description2,
      image3,
      description3,
      category,
    } = req.body.blogData;
    const { editBlogId, token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData.userId;

    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: editBlogId, userId: userId },
      {
        title,
        subtitle,
        image1,
        description1,
        image2,
        description2,
        image3,
        description3,
        category,
      },
      { new: true }
    );

    if (updatedBlog)
      return res.status(200).json({
        success: true,
        blog: updatedBlog,
        message: "Blog updated successfully!",
      });

    return res.status(404).json({
      success: false,
      message: "you are trying to update the blog which is not yours!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId)
      return res
        .status(404)
        .json({ success: true, message: "blog Id is required!" });

    const singleBlog = await BlogModel.findById(blogId);
    const { userId } = singleBlog;

    const user = await UserModel.findById(userId);
    // console.log(user, "here");

    if (!singleBlog)
      return res
        .status(404)
        .json({ success: false, message: "Failed to fetch blog!" });

    return res
      .status(200)
      .json({ success: true, singleBlog, user, comments: singleBlog.comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getYourBlogs = async (req, res) => {
  try {
    const { token } = req.body;

    console.log(token);

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData.userId;

    const blogs = await BlogModel.find({ userId: userId });

    console.log(blogs, "blogs");

    if (blogs?.length)
      return res
        .status(200)
        .json({ success: true, "No of blogs": blogs.length, blogs: blogs });

    return res.status(404).json({ success: false, message: "No Blogs Found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteYourBlog = async (req, res) => {
  try {
    const { token, blogId } = req.body;

    if (!token || !blogId)
      return res
        .status(404)
        .json({ success: false, message: "Token and Blog Id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedData.userId;

    const isBlogDeleted = await BlogModel.findOneAndDelete({
      _id: blogId,
      userId: userId,
    });

    if (isBlogDeleted) {
      return res.status(200).json({
        success: true,
        message: "Blog Deleted!",
        deletedBlog: isBlogDeleted,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Something went wrong!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getEditBlogData = async (req, res) => {
  try {
    const { token, editBlogId } = req.body;

    if (!token || !editBlogId)
      return res
        .status(404)
        .json({ success: false, message: "Token and Blog Id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData.userId;

    const user = await UserModel.findById(userId);

    if (user && user?.role == "Admin") {
      const blog = await BlogModel.findById(editBlogId);

      return res.status(200).json({ success: true, blog: blog });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
