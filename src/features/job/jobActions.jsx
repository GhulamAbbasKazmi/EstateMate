import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const host = "http://localhost:5000";

export const getJobs = createAsyncThunk(
    "job/getJobs",
    async (arg, { getState, rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/Jobs/`, config);
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

export const getJob = createAsyncThunk(
    "job/getJob",
    async ({
            id 
        },
        { rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/Jobs/${id}`, config);
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

export const postJob = createAsyncThunk(
    "job/postJob",
    async (
        {
            admin_email, job

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
                `/api/Jobs/`,
                {
                    admin_email, job
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

export const updateJob = createAsyncThunk(
    "job/updateJob",
    async (
        {
            admin_email, job
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
                `/api/Jobs/update`,
                {
                    admin_email, job
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

export const deleteJob = createAsyncThunk(
    "job/deleteJob",
    async (
        {
            admin_email, job
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
                `/api/Jobs/delete`,
                {
                    admin_email, job
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