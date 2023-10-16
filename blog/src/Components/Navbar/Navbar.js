import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigateTo = useNavigate();

  return (
    <div id="navbar">
      <div id="left">
        <p>Create Your Blog</p>
        <p>Your Blogs</p>
      </div>
      <div id="middle">
        <h2 onClick={() => navigateTo("/")}>
          BLOGS. <span>point</span>
        </h2>
      </div>
      <div id="right">
        <p>Santosh Chappidi</p>
        <p>Bookmarks</p>
        <p onClick={() => navigateTo("/login")}>Register/Login</p>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
