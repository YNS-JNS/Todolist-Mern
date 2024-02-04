import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    tasks: [],
};

// Todo: Get Tasks
export const getTasks = createAsyncThunk("task/getTasks", async () => {
    const response = await axios.get("http://localhost:8000/api/tasks");
    return response.data;
});

export const taskSlice = createSlice({

    name: "task",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                console.log("Pending : ", state.loading);
            })
            .addCase(getTasks.fulfilled, (state, { payload }) => {
                console.log("Data filled");
                state.tasks = payload;
                state.loading = false;
            })
            .addCase(getTasks.rejected, () => {
                console.log("Response rejected !");
            });
    }

    // -----------------------------------------------------------
    // extraReducers: {
    //     [getTasks.pending]: (state) => {
    //         state.loading = true;
    //         console.log("Pending : ", state.loading)
    //     },
    //     [getTasks.fulfilled]: (state, { payload }) => {
    //         console.log("Data filled");
    //         return {
    //             ...state,
    //             tasks: payload,
    //             loading: false
    //         }
    //     },
    //     [getTasks.rejected]: () => {
    //         console.log("Response rejected !")
    //     }
    // }
    // -----------------------------------------------------------

});

export default taskSlice.reducer;