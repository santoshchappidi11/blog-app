import React, { useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";

const Navbar = () => {
  const navigateTo = useNavigate();
  const { state, Logout } = useContext(AuthContexts);

  return (
    <div id="navbar">
      <div id="left">
        {state?.currentUser?.name && (
          <>
            <p>Create Your Blog</p>
            <p>Your Blogs</p>
          </>
        )}
      </div>
      <div id="middle">
        <h2 onClick={() => navigateTo("/")}>
          BLOGS. <span>point</span>
        </h2>
      </div>
      <div id="right">
        {state?.currentUser?.name && <p> Hi, {state?.currentUser?.name}</p>}
        {state?.currentUser?.name && <p>Bookmarks</p>}
        {!state?.currentUser?.name && (
          <p onClick={() => navigateTo("/login")}>Register/Login</p>
        )}
        {state?.currentUser?.name && <p onClick={Logout}>Logout</p>}
      </div>
    </div>
  );
};

export default Navbar;
