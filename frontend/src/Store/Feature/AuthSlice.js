import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:5000/api/v1';


export const loginAsync = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials);
    
    // Check if the request was successful
    if (response.data.success) {
      const { _id, username, email, name, accessToken } = response.data.user;

      // Store relevant user data in local storage
      localStorage.setItem('user', JSON.stringify({ _id, username, email, name }));
      localStorage.setItem('accessToken', accessToken);

      // Return the entire user object from the response
      return response.data.user;
    } else {
      // If success is false, reject with the message from the API
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    // Handle network errors or other unexpected errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return rejectWithValue(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      return rejectWithValue('No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      return rejectWithValue(error.message);
    }
  }
});


// Async thunk for user signup
export const signupAsync = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    // Make a POST request to the signup endpoint with user data
    const response = await axios.post(`${baseURL}/signup`, userData);

    // Assuming your signup API also returns a 'success' field and a 'user' object
    if (response.data.success && response.data.user) {
      const { _id, username, email, name, accessToken } = response.data.user;

      // Store relevant user data in local storage immediately after successful signup
      localStorage.setItem('user', JSON.stringify({ _id, username, email, name }));
      localStorage.setItem('accessToken', accessToken); // Store the accessToken received from signup

      // Return the user object from the response to be stored in Redux state
      return response.data.user;
    } else {
      // If 'success' is false or user object is missing, reject with the message
      return rejectWithValue(response.data.message || 'Signup failed or user data missing.');
    }
  } catch (error) {
    // Handle various types of errors for signup
    if (error.response) {
      // The server responded with a status code outside of 2xx
      return rejectWithValue(error.response.data.message || 'Server error during signup');
    } else if (error.request) {
      // The request was made but no response was received
      return rejectWithValue('No response from server. Please check your network connection.');
    } else {
      // Something else happened in setting up the request
      return rejectWithValue(error.message || 'An unexpected error occurred during signup');
    }
  }
});







const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear any previous errors
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Store the user object in the Redux state
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // action.payload will contain the error message from rejectWithValue
        state.user = null; // Clear user on login failure
      });
  },
});

export default authSlice.reducer;

