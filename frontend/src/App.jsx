import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import NavMenu from "./NavBar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-loaded components
const Home = lazy(() => import("./Components/Home"));
const News = lazy(() => import("./Components/News"));
const BlogDetails = lazy(() => import("./Components/BlogDetails"));
const NotFound = lazy(() => import("./NotFound")); // 404 page

function App() {
  return (
    <>
      <NavMenu />
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          {/* Optional: If News route is still needed */}
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
