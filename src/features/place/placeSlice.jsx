import { createSlice } from "@reduxjs/toolkit";
import {
    getPlaces,
    getPlace,
    postPlace,
    updatePlace,
    deletePlace
} from "./placeActions";

const initialState = {
    loading: false,
    places: null,
    place: null,
    error: null,
    success: null,
};

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {},
    extraReducers: {

        // get place
        [getPlace.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getPlace.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.place = payload;
            state.success = true;
        },
        [getPlace.rejected]: (state, { payload }) => {
            state.loading = false;
            state.place = null;
            state.error = payload;
        },

        // post place
        [postPlace.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [postPlace.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.place = payload;
            state.success = 'Place has been posted successfully!';
        },
        [postPlace.rejected]: (state, { payload }) => {
            state.loading = false;
            state.place = null;
            state.error = payload;
        },

        // update blog
        [updatePlace.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updatePlace.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.place = payload;
            state.success = 'Place has been updated successfully!';
        },
        [updatePlace.rejected]: (state, { payload }) => {
            state.loading = false;
            state.place = null;
            state.error = payload;
        },

        // get places
        [getPlaces.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getPlaces.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.places = payload;
            state.success = true;
        },
        [getPlaces.rejected]: (state, { payload }) => {
            state.loading = false;
            state.places = null;
            state.error = payload;
        },

        // delete place
        [deletePlace.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [deletePlace.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.place = null;
            state.success = 'Place has been delete successfully!';
        },
        [deletePlace.rejected]: (state, { payload }) => {
            state.loading = false;
            state.place = null;
            state.error = payload;
        },
    },
});


export default placeSlice.reducer;
