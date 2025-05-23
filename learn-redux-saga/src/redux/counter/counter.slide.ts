import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: number;
    status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
    value: 0,
    status: "idle",
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        increaseSagaStart: (state) => {
            state.status = "loading";
        },
        increaseSagaSuccess: (
            state,
            action: PayloadAction<{ value: number }>
        ) => {
            //action chính là payload từ saga
            state.status = "idle";
            state.value += action.payload.value;
        },
        increaseSagaFailed: (state) => {
            state.status = "failed";
        },
        decreaseSagaStart: (state) => {
            state.status = "loading";
        },
        decreaseSagaSuccess: (
            state,
            action: PayloadAction<{ value: number }>
        ) => {
            //action chính là payload từ saga
            state.status = "idle";
            state.value -= action.payload.value;
        },
        decreaseSagaFailed: (state) => {
            state.status = "failed";
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    increment,
    decrement,
    increaseSagaStart,
    increaseSagaSuccess,
    increaseSagaFailed,
    decreaseSagaStart,
    decreaseSagaSuccess,
    decreaseSagaFailed,
} = counterSlice.actions;

export default counterSlice.reducer;
