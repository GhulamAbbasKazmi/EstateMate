import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import blogReducer from "../features/blog/blogSlice";
import attendanceReducer from "../features/attendance/attendanceSlice"
import placeReducer from "../features/place/placeSlice";
import jobReducer from "../features/job/jobSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    attendance: attendanceReducer,
    place: placeReducer,
    job: jobReducer,
  },
});
