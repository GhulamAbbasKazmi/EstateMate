import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const host = "http://localhost:5000";

export const getPlaces = createAsyncThunk(
    "place/getPlaces",
    async (arg, { getState, rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/investmentPlaces/`, config);
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

export const getPlace = createAsyncThunk(
    "place/getPlace",
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

            const { data } = await axios.get(`/api/investmentPlaces/${id}`, config);
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

export const postPlace = createAsyncThunk(
    "place/postPlace",
    async (
        {
            admin_email, place

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
                `/api/investmentPlaces/`,
                {
                    admin_email, place
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

export const updatePlace = createAsyncThunk(
    "place/updatePlace",
    async (
        {
            admin_email, place
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
                `/api/investmentPlaces/update`,
                {
                    admin_email, place
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

export const deletePlace = createAsyncThunk(
    "place/deletePlace",
    async (
        {
            admin_email, place
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
                `/api/investmentPlaces/delete`,
                {
                    admin_email, place
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