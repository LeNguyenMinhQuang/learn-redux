import {
    createSlice,
    type PayloadAction,
    createAction,
} from "@reduxjs/toolkit";

export interface CounterState {
    value: number;
    status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
    value: 0,
    status: "idle",
};

export const increaseSagaSuccess = createAction<{ value: number }>( //viết ntn thì viết logic vào extra builder
    "increaseSagaSuccess"
);
export const decreaseSagaSuccess = createAction<{ value: number }>( //còn thế này thì không cần
    "counter/decreaseSagaSuccess"
);

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
        // increaseSagaSuccess: (
        //     state,
        //     action: PayloadAction<{ value: number }>
        // ) => {
        //     //action chính là payload từ saga
        //     state.status = "idle";
        //     state.value += action.payload.value;
        // },
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
    extraReducers: (builder) => {
        builder.addCase(
            increaseSagaSuccess,
            (state, action: PayloadAction<{ value: number }>) => {
                state.status = "idle";
                state.value += action.payload.value;
            }
        );
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, increaseSagaStart, decreaseSagaStart } =
    counterSlice.actions;

export default counterSlice.reducer;
