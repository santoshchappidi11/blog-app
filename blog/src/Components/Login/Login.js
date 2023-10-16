import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigateTo = useNavigate();

  return (
    <div id="login-screen">
      <div id="login">
        <div id="login-header">
          {/* <div id="login-image">
          <img
            src="https://www.hudsonintegrated.com/pub/blogimages/20140305094710_blog49006_640.png"
            alt="login"
          />
        </div> */}
          <h1>SIGN IN</h1>
        </div>
        <div id="login-body">
          <form>
            <div className="fields">
              <label>Your Email:</label>
              <input type="text" />
            </div>
            <div className="fields">
              <label>Your Password:</label>
              <input type="password" />
            </div>
            <div id="login-btn">
              <button>Login</button>
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
