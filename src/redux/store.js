import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import eventReducer from './events/eventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

export default store;
