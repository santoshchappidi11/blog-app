import React, { useContext, useEffect, useState } from "react";
import "./SingleBlog.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../Context/AuthContext";

const SingleBlog = () => {
  // const { state } = useContext(AuthContexts);
  const { blogId } = useParams();
  const [singleBlog, setSingleBlog] = useState({});
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  // const [user, setUser] = useState({});

  const handleChangeValues = (e) => {
    setUserComment({ ...userComment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (blogId) => {
    if (userComment) {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/add-comment", {
            token,
            blogId,
            userComment,
          });

          if (response.data.success) {
            setAllComments(response.data.comments);
            toast.success(response.data.message);
            setUserComment("");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Please write your thoughts to add comment!");
    }
  };

  useEffect(() => {
    const getSingleBlog = async () => {
      if (blogId) {
        try {
          const response = await api.post("/get-single-blog", {
            blogId,
            // userId: state?.currentUser?.userId,
          });

          if (response.data.success) {
            setSingleBlog(response.data.singleBlog);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };

    getSingleBlog();
  }, [blogId]);

  return (
    <div id="single-blog-scrren">
      <div id="single-blog-header">
        <div id="blog-author">
          <div id="author">
            <i class="fa-solid fa-circle-user fa-2x"></i>
            <div id="author-details">
              <p>Santosh Chappidi</p>
              <span>santosh@gmail.com</span>
            </div>
          </div>
          <div id="blog-created">
            <p>12 sat 2023</p>
          </div>
        </div>
        <div id="blog-actions">
          <div>
            <i class="fa-solid fa-pen-to-square fa-2x"></i>
            <p>Edit Your Blog</p>
          </div>
          <div>
            <i class="fa-solid fa-trash fa-2x"></i>
            <p>Delete Your Blog</p>
          </div>
        </div>
      </div>
      <div id="single-blog-title">
        <h2>{singleBlog.title}</h2>
      </div>
      <div id="single-blog-body">
        <div className="description">
          <div className="desc-img">
            <img src={singleBlog.image1} alt="blog" />
          </div>
          <div className="desc">
            <p>{singleBlog.description1}</p>
          </div>
        </div>
        <div className="description">
          <div className="desc">
            <p>{singleBlog.description2}</p>
          </div>
          <div className="desc-img">
            <img src={singleBlog.image2} alt="blog" />
          </div>
        </div>
        <div className="description">
          <div className="desc-img">
            <img src={singleBlog.image3} alt="blog" />
          </div>
          <div className="desc">
            <p>{singleBlog.description3}</p>
          </div>
        </div>
      </div>
      <div id="single-blog-footer">
        <div id="single-blog-footer-header">
          <h3>Conversation</h3>

          <span>
            Welcome to Blogs Point comments! Please keep conversation courteous
            and on-topic. See our community huidelines for more information.
          </span>
        </div>
        <div id="comment-box">
          <input
            type="text"
            placeholder="comment here..."
            onChange={handleChangeValues}
          />
          <button
            type="submit"
            onClick={() => handleCommentSubmit(singleBlog._id)}
          >
            Add
          </button>
        </div>
        <div id="all-comments">
          {allComments?.length ? (
            allComments.map((item) => (
              <div className="comment" key={item?.commentId}>
                <div className="user">
                  <i class="fa-solid fa-circle-user fa-2x"></i>
                  <div className="user-details">
                    <p>{item?.name}</p>
                    <span>{item?.email}</span>
                  </div>
                </div>
                <div className="user-comment">
                  <span>{item?.userComment[0]}</span>
                </div>
              </div>
            ))
          ) : (
            <div id="no-comment-msg">
              <h4>No Comments Yet!</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
