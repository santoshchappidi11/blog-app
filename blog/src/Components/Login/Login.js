import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../Context/AuthContext";

const Login = () => {
  const { Login } = useContext(AuthContexts);
  const navigateTo = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      try {
        const response = await api.post("/login", { userData });

        if (response.data.success) {
          Login(response.data);
          toast.success(response.data.message);
          setUserData({
            email: "",
            password: "",
          });
          navigateTo("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please fill all the details!");
    }
  };

  return (
    <div id="login-screen">
      <div id="login-header-style">
        <h1>S</h1>
        <h1>I</h1>
        <h1>G</h1>
        <h1>N</h1>
        <br />
        <h1>I</h1>
        <h1>N</h1>
      </div>
      <div id="login">
        <div id="login-header">
          <h1>SIGN IN</h1>
        </div>
        <div id="login-body">
          <form onSubmit={handleLoginSubmit}>
            <div className="fields">
              <label>Your Email :</label>
              <input
                type="text"
                name="email"
                onChange={handleChangeValues}
                value={userData.email}
              />
            </div>
            <div className="fields">
              <label>Your Password :</label>
              <input
                type="password"
                name="password"
                onChange={handleChangeValues}
                value={userData.password}
              />
            </div>
            <div id="login-btn">
              <button type="submit">Login</button>
            </div>
          </form>
          <div id="have-account">
            <p>
              Don't have an account?{" "}
              <span onClick={() => navigateTo("/register")}>SIGN UP</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
