import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigateTo = useNavigate();

  return (
    <div id="register-screen">
      <div id="register">
        <div id="register-header">
          {/* <div id="register-image">
            <img
              src="https://www.hudsonintegrated.com/pub/blogimages/20140305094710_blog49006_640.png"
              alt="register"
            />
          </div> */}
          <h1>SIGN UP</h1>
        </div>
        <div id="register-body">
          <form>
            <div className="fields">
              <label>Your Name:</label>
              <input type="text" />
            </div>
            <div className="fields">
              <label>Your Email:</label>
              <input type="text" />
            </div>
            <div className="fields">
              <label>Your Number:</label>
              <input type="number" />
            </div>
            <div className="fields">
              <label>Your Password:</label>
              <input type="password" />
            </div>
            <div className="fields">
              <label>Confirm Password:</label>
              <input type="password" />
            </div>
            <div id="register-btn">
              <button>Register</button>
            </div>
          </form>
          <div id="have-account">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigateTo("/login")}>SIGN IN</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
