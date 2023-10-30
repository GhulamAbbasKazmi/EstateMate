import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const host = "http://localhost:5000";

export const getAttendances = createAsyncThunk(
    "attendance/getAttendances",
    async (arg, { getState, rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/attendances/`, config);
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const postAttendance = createAsyncThunk(
    "attendance/postAttendance",
    async (
        {
            email,
            attendance

        },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/attendances/post`,
                {
                    email,
                    attendance
                },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const updateAttendance = createAsyncThunk(
    "attendance/updateAttendance",
    async (
        {
            email,
            attendance,
            id,
            deletedSecImages
        },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/attendances/${id}`,
                {
                    email,
                    attendance,
                    deletedSecImages
                },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const updateAttendanceByUser = createAsyncThunk(
    "attendance/updateAttendanceByUser",
    async (
        {
            email,
            id,
            comment_id,
            comment,
            reply,
            like,
            delete_comment_id,
            delete_reply_id
        },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/attendances/updateByUser`,
                {
                    email,
                    id,
                    comment_id,
                    comment,
                    reply,
                    like,
                    delete_comment_id,
                    delete_reply_id
                },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);