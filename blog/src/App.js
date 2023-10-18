import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import SingleBlog from "./Components/Blog/SingleBlog";
import CreateBlog from "./Components/Blog/CreateBlog";
import YourBlogs from "./Components/Blog/YourBlogs";
import EditYourBlog from "./Components/Blog/EditYourBlog";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/single-blog/:blogId" element={<SingleBlog />} />
        <Route exact path="/create-blog" element={<CreateBlog />} />
        <Route exact path="/your-blogs" element={<YourBlogs />} />
        <Route
          exact
          path="/edit-your-blog/:editBlogId"
          element={<EditYourBlog />}
        />
      </Routes>
    </div>
  );
}

export default App;
