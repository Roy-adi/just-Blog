import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import NavMenu from "./NavBar";
import Home from "./Components/Home";
import News from "./Components/News";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import BlogDetails from "./Components/BlogDetails";

function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
