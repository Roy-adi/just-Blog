import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer : {
    // Add your reducers here
    // For example, if you have a user slice:
    // user: userReducer,
  }
})