import { createSlice } from "@reduxjs/toolkit";
import {
    getJobs,
    getJob,
    postJob,
    updateJob,
    deleteJob
} from "./jobActions";

const initialState = {
    loading: false,
    jobs: null,
    job: null,
    error: null,
    success: null,
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {},
    extraReducers: {

        // get job
        [getJob.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getJob.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.job = payload;
            state.success = true;
        },
        [getJob.rejected]: (state, { payload }) => {
            state.loading = false;
            state.job = null;
            state.error = payload;
        },

        // post job
        [postJob.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [postJob.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.job = payload;
            state.success = 'Job has been posted successfully!';
        },
        [postJob.rejected]: (state, { payload }) => {
            state.loading = false;
            state.job = null;
            state.error = payload;
        },

        // update blog
        [updateJob.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updateJob.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.job = payload;
            state.success = 'Job has been updated successfully!';
        },
        [updateJob.rejected]: (state, { payload }) => {
            state.loading = false;
            state.job = null;
            state.error = payload;
        },

        // get jobs
        [getJobs.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getJobs.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.jobs = payload;
            state.success = true;
        },
        [getJobs.rejected]: (state, { payload }) => {
            state.loading = false;
            state.jobs = null;
            state.error = payload;
        },

        // delete job
        [deleteJob.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [deleteJob.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.job = null;
            state.success = 'Job has been delete successfully!';
        },
        [deleteJob.rejected]: (state, { payload }) => {
            state.loading = false;
            state.job = null;
            state.error = payload;
        },
    },
});


export default jobSlice.reducer;
