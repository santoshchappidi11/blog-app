import React, { useContext, useEffect, useState } from "react";
import "./SingleBlog.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../Context/AuthContext";
import LikeBlog from "./LikeBlog";
import BookmarkBlog from "./BookmarkBlog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleBlog = () => {
  const { state } = useContext(AuthContexts);
  const { blogId } = useParams();
  const navigateTo = useNavigate();
  const [singleBlog, setSingleBlog] = useState({});
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [user, setUser] = useState({});
  const [modifiedDate, setModifiedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // console.log(singleBlog, "single blog");

  useEffect(() => {
    if (singleBlog?.date) {
      const date = new Date(singleBlog?.date);

      setModifiedDate(date.toDateString());
    }
  }, [singleBlog]);

  const handleChangeValues = (e) => {
    setUserComment(e.target.value);
  };

  const handleDeleteBlog = async (blogId) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      const response = await api.post("/delete-your-blog", { token, blogId });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      try {
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
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
          });

          if (response.data.success) {
            setIsLoading(false);
            setSingleBlog(response.data.singleBlog);
            setAllComments(response.data.comments);
            setUser(response.data.user);
          } else {
            setIsLoading(false);
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };

    getSingleBlog();
  }, [blogId]);

  const deleteBlogComment = async (ID) => {
    console.log("delete comment here");
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && blogId) {
      // console.log(token, blogId, ID, "all here");
      try {
        const response = await api.post("/delete-comment", {
          token,
          ID,
          blogId,
        });

        if (response.data.success) {
          setAllComments(response.data.comments);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div id="single-blog-loading">
          <h3>Loading...</h3>
        </div>
      ) : (
        <div id="single-blog-scrren">
          <div id="single-blog-header">
            <div id="blog-author">
              <div id="author">
                <FontAwesomeIcon icon="fa-solid fa-circle-user fa-2x" />
                <div id="author-details">
                  <p>{user?.name}</p>
                  <span>{user?.email}</span>
                </div>
              </div>
              <div id="blog-created">
                <b>Created At</b>
                <p>{modifiedDate}</p>
              </div>
            </div>
            <div id="blog-actions">
              {state?.currentUser?.role == "Admin" ? (
                <>
                  <div
                    onClick={() =>
                      navigateTo(`/edit-your-blog/${singleBlog._id}`)
                    }
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-pen-to-square"
                      style={{ fontSize: "25px" }}
                    />
                    <p>Edit Your Blog</p>
                  </div>
                  <div onClick={() => handleDeleteBlog(singleBlog._id)}>
                    <FontAwesomeIcon
                      icon="fa-solid fa-trash"
                      style={{ fontSize: "25px" }}
                    />
                    <p>Delete Your Blog</p>
                  </div>
                </>
              ) : (
                <>
                  <LikeBlog blogId={singleBlog._id} likes={singleBlog?.likes} />
                  <BookmarkBlog
                    blogId={singleBlog._id}
                    bookmarks={singleBlog?.bookmarks}
                  />
                </>
              )}
            </div>
          </div>
          <div id="single-blog-title">
            <h2>{singleBlog?.title}</h2>
            <span>{singleBlog?.subtitle}</span>
          </div>
          <div id="single-blog-body">
            <div className="description">
              <div className="desc-img">
                <img src={singleBlog?.image1} alt="blog" />
              </div>
              <div className="desc">
                <p>{singleBlog?.description1}</p>
              </div>
            </div>
            <div className="description">
              <div className="desc-img">
                <img src={singleBlog?.image2} alt="blog" />
              </div>
              <div className="desc">
                <p>{singleBlog?.description2}</p>
              </div>
            </div>
            <div className="description">
              <div className="desc-img">
                <img src={singleBlog?.image3} alt="blog" />
              </div>
              <div className="desc">
                <p>{singleBlog?.description3}</p>
              </div>
            </div>
          </div>
          <div id="single-blog-footer">
            <div id="single-blog-footer-header">
              <h3>Conversation</h3>

              <span>
                Welcome to Blogs Point comments! Please keep conversation
                courteous and on-topic. See our community huidelines for more
                information.
              </span>
            </div>
            <div id="comment-box">
              <input
                type="text"
                placeholder="comment here..."
                onChange={handleChangeValues}
                value={userComment}
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
                    <div className="delete-comment">
                      <div
                        className="main-delete-comment"
                        onClick={() => deleteBlogComment(item?.commentId)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                      </div>
                    </div>
                    <div className="user">
                      <i class="fa-solid fa-circle-user fa-2x"></i>
                      <div className="user-details">
                        <p>{item?.name}</p>
                        <span>{item?.email}</span>
                      </div>
                    </div>
                    <div className="user-comment">
                      <span>{item?.comment}</span>
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
      )}
    </>
  );
};

export default SingleBlog;
