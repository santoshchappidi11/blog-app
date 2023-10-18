import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlogModel from "../Models/BlogModel.js";
import { v4 as uuidv4 } from "uuid";

export const Register = async (req, res) => {
  try {
    const { name, email, number, password, role } = req.body.userData;
    if (!name || !email || !password || !number || !role)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const isEmailExist = await UserModel.find({ email: email });
    if (isEmailExist.length) {
      return res.status(404).json({
        success: false,
        message: "This email already exists, try different email!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      number,
      password: hashedPassword,
      role,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Registration successfull!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    if (!email || !password)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });

    if (user.isBlocked) {
      return res.status(404).json({
        success: false,
        message: "You have been blocked!",
      });
    }

    const isPasswordRight = await bcrypt.compare(password, user.password);

    if (isPasswordRight) {
      const userObject = {
        userId: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        role: user.role,
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: "Login successfull",
        user: userObject,
        token: token,
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "Password is wrong" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid json token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });

    const userObj = {
      userId: user?._id,
      name: user?.name,
      email: user?.email,
      number: user?.number,
      role: user?.role,
    };

    return res.status(200).json({ success: true, user: userObj });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { name, password } = req.body;
    const { token } = req.body;

    if (name || password) {
      if (!token)
        return res
          .status(404)
          .json({ success: false, message: "Token is required!" });

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedData)
        return res
          .status(404)
          .json({ success: false, message: "Not a valid token!" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = decodedData?.userId;

      const user = await UserModel.findById(userId);

      if (user) {
        if (name?.length) {
          user.name = name;
        }
        if (password?.length) {
          user.password = hashedPassword;
        }
        await user.save();

        const userObject = {
          userId: user?._id,
          name: user?.name,
          email: user?.email,
          number: user?.number,
          role: user?.role,
        };
        return res.status(200).json({
          success: true,
          message: "Profile updated successfully!",
          user: userObject,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "No user found to update!" });
    }

    return res.status(404).json({
      success: false,
      message: "please change atleast one field to update your profile!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const likeUnlikeBlog = async (req, res) => {
  try {
    const { token, blogId } = req.body;

    if (!blogId)
      return res
        .status(404)
        .json({ success: false, message: "blog ID is required!" });

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);
    const blog = await BlogModel.findById(blogId);

    // console.log(blog);

    if (blog && blog?.likes) {
      let blogFlag = false;

      for (let i = 0; i < blog?.likes?.length; i++) {
        if (blog?.likes?.includes(user._id)) {
          blogFlag = true;
        }
      }

      if (blogFlag == false) {
        blog?.likes?.push(user._id);
        await blog.save();
        return res.status(200).json({
          success: true,
          message: "You liked the blog!",
          isBlogLike: true,
        });
      }

      const updatedLikes = blog?.likes?.filter((item) => item != user._id);
      const updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { likes: updatedLikes },
        { new: true }
      );
      await updatedBlog.save();
      return res.status(200).json({
        success: true,
        message: "You unliked the blog!",
        isBlogLike: false,
      });
    }
    return res.status(404).json({ success: false, message: "No blog found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const bookmarkBlog = async (req, res) => {
  try {
    const { token, blogId } = req.body;

    if (!blogId)
      return res
        .status(404)
        .json({ success: false, message: "blog ID is required!" });

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);
    // const blog = await BlogModel.findById(blogId);

    // console.log(blog);

    if (user && user?.bookmarks) {
      let flag = false;

      for (let i = 0; i < user?.bookmarks?.length; i++) {
        if (user?.bookmarks?.includes(blogId)) {
          flag = true;
        }
      }

      if (flag == false) {
        user?.bookmarks?.push(blogId);
        await user.save();
        return res.status(200).json({
          success: true,
          message: "You bookmarked the blog!",
          isBlogBookmarked: true,
        });
      }

      const updatedBookmarks = user?.bookmarks?.filter(
        (item) => item != blogId
      );
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { bookmarks: updatedBookmarks },
        { new: true }
      );
      await updatedUser.save();
      return res.status(200).json({
        success: true,
        message: "You removed the bookmark!",
        isBlogBookmarked: false,
      });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllBookmarkedBlogs = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      let allBookmarks = [];

      for (let i = 0; i < user?.bookmarks?.length; i++) {
        const blog = await BlogModel.findById(user.bookmarks[i]);

        if (blog) {
          allBookmarks.push(blog);
        }
      }

      return res.status(200).json({ success: true, allBookmarks });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { userComment, token, blogId } = req.body;

    console.log(userComment, token, blogId);

    if (!token || !blogId)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const blog = await BlogModel.findById(blogId);

      if (blog && blog?.comments) {
        const randomId = uuidv4();
        const commentId = randomId.slice(0, 10);

        const commentObj = {
          commentId,
          userId: user._id,
          name: user.name,
          email: user.email,
          comment: userComment,
        };

        blog?.comments?.push(commentObj);
        await blog.save();
        return res.status(200).json({
          success: true,
          message: "Your comment added!",
          comments: blog.comments,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "No blog found!" });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
