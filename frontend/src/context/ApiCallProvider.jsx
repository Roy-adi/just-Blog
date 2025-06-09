/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AppContext = createContext();

export const ApiCallProvider = ({ children }) => {
  const base_url = "http://localhost:5000/api/v1";
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState({});
  const [blogData, setblogData] = useState([]);
  const [BlogDetails, setblogDetails] = useState([]);
  const [BlogCommentList, setBlogCommentList] = useState([]);

  const loginUser = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/login`,
        {
          ...dataToSend,
        },
        {
          headers: {},
        }
      );

      if (response.status === 200) {
        const { _id, username, email, name, accessToken } = response.data.user;
        // Store access token and name in localStorage
        localStorage.setItem("accessToken", response.data.user.accessToken);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem(
          "user",
          JSON.stringify({ _id, username, email, name })
        );

        // Display success notification
        toast.success("Successfully logged in!");
        return {
          success: true,
          user: { _id, username, email, name },
          token: accessToken,
        };
      } else {
        toast.error("Failed to Signup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed");
    }
  };

  const SignUpUser = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/signup`,
        {
          ...dataToSend,
        },
        {
          headers: {},
        }
      );

      if (response.status === 201) {
        const { _id, username, email, name } = response.data.user;
        // Store access token and name in localStorage
        localStorage.setItem("accessToken", response.data.user.accessToken);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem(
          "user",
          JSON.stringify({ _id, username, email, name })
        );

        // Display success notification
        toast.success("Successfully logged in!");
      } else {
        toast.error("Failed to Signup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed");
    }
  };

  const CreateBlog = async (dataToSend) => {
    try {
      const response = await axios.post(`${base_url}/createblog`, dataToSend, {
        headers: {
          Authorization: token,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Details failed:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getBlogPostList = async (dataToSend) => {
    try {
      const response = await axios.post(`${base_url}/blogs/category`,dataToSend, {
        headers: {
          Authorization: token,
        },
      });

      setblogData(response.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

    const getBlogDetails = async (id) => {
    try {
      const response = await axios.get(`${base_url}/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setblogDetails(response.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

    const getBlogCommentList = async (id) => {
    try {
      const response = await axios.get(`${base_url}/blogs/${id}/comments`, {
        headers: {
          Authorization: token,
        },
      });

      setBlogCommentList(response.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

    const Createcomment = async (commentData) => {
    try {
      const { id, text } = commentData;
      const response = await axios.post(`${base_url}/addBlog/${id}/comments`, {text}, {
        headers: {
          Authorization: token,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Details failed:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const values = { loginUser, SignUpUser, CreateBlog, getBlogPostList, blogData,getBlogDetails,BlogDetails,getBlogCommentList,BlogCommentList,Createcomment };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApiCallContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
