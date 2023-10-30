import { createSlice } from "@reduxjs/toolkit";
import {
    postAttendance,
    updateAttendance,
    getAttendances,
    updateAttendanceByUser
} from "./attendanceActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const initialState = {
    loading: false,
    attendances: null,
    myAttendance: null,
    userToken,
    error: null,
    success: null,
};

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken"); // delete token from storage
            state.loading = false;
            state.attendances = null;
            state.myAttendance = null;
            state.userToken = null;
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: {

        // post attendance
        [postAttendance.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [postAttendance.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.myAttendance = payload;
            state.success = 'Attendance & progress has been posted successfully!';
        },
        [postAttendance.rejected]: (state, { payload }) => {
            state.loading = false;
            state.myAttendance = null;
            state.error = payload;
        },

        // update attendance
        [updateAttendance.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updateAttendance.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.myAttendance = payload;
            state.success = 'Attendance & Progress has been updated successfully!';
        },
        [updateAttendance.rejected]: (state, { payload }) => {
            state.loading = false;
            state.myAttendance = null;
            state.error = payload;
        },

        // update attendance By User
        [updateAttendanceByUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updateAttendanceByUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.attendances = payload;
            state.success = true;
        },
        [updateAttendanceByUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = null;
        },

        // get attendances
        [getAttendances.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getAttendances.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.attendances = payload;
            state.success = true;
        },
        [getAttendances.rejected]: (state, { payload }) => {
            state.loading = false;
            state.attendances = null;
            state.error = payload;
        },
    },
});

export const { logout } = attendanceSlice.actions;

export default attendanceSlice.reducer;
