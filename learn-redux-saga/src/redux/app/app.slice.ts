import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
    mode: string;
} = {
    mode: "light",
};

// First, create the thunk

// export const changeMode = createAsyncThunk(
//     "app/changeMode", //tên của thunk
//     async (payload, thunkAPI) => {}
// );

export const UserSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload;
        },
    },
    extraReducers: (builder) => {
        // những hành động yêu cầu bất đồng bộ như callAPI, đợi kết quả của 1 slice khác,...
        // builder.addCase(changeMode.fulfilled, (state, action) => {});
    },
});

export const { changeMode } = UserSlice.actions;

export default UserSlice.reducer;
