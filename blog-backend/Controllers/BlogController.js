import jwt from "jsonwebtoken";
import BlogModel from "../Models/BlogModel.js";

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
    const { title, subtitle, image, description, category } = req.body;
    const { token } = req.body;

    if (!title || !subtitle || !image || !description || !category || !token)
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
      image,
      description,
      category,
      userId: userId,
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
    const { title, subtitle, image, description, category } = req.body;
    const { blogId, token } = req.body;

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
      { _id: blogId, userId: userId },
      { title, subtitle, image, description, category },
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

    if (!singleBlog)
      return res
        .status(404)
        .json({ success: false, message: "Failed to fetch blog!" });

    return res.status(200).json({ success: true, singleBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getYourBlogs = async (req, res) => {
  try {
    const { token } = req.body;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData)
      return res
        .status(404)
        .json({ status: "error", message: "Not a valid token!" });

    const userId = decodedData.userId;

    const blogs = await BlogModel.find({ userId: userId });

    if (blogs.length)
      return res
        .status(200)
        .json({ status: "success", "No of blogs": blogs.length, blogs });

    return res
      .status(404)
      .json({ status: "error", message: "No Blogs Found!" });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
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
