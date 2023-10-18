import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig/index";

const Register = () => {
  const navigateTo = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  // console.log(userData);

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.name &&
      userData.email &&
      userData.number &&
      userData.password &&
      userData.confirmPassword &&
      userData.role
    ) {
      if (userData.password == userData.confirmPassword) {
        try {
          const response = await api.post("/register", { userData });

          if (response.data.success) {
            toast.success(response.data.message);
            setUserData({
              name: "",
              email: "",
              number: "",
              password: "",
              confirmPassword: "",
              role: "User",
            });
            navigateTo("/login");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Password and Confirm Password does not match!");
      }
    } else {
      toast.error("Please fill all the details!");
    }
  };

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
          <form onSubmit={handleRegisterSubmit}>
            <div className="fields">
              <label>Your Name :</label>
              <input
                type="text"
                name="name"
                onChange={handleChangeValues}
                value={userData.name}
              />
            </div>
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
              <label>Your Number :</label>
              <input
                type="number"
                name="number"
                onChange={handleChangeValues}
                value={userData.number}
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
            <div className="fields">
              <label>Confirm Password :</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChangeValues}
                value={userData.confirmPassword}
              />
            </div>
            <div className="role">
              <label>Select Role :</label>
              <select
                name="role"
                onChange={handleChangeValues}
                value={userData.role}
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            <div id="register-btn">
              <button type="submit">Register</button>
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
