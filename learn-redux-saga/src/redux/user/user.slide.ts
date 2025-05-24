import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUsers } from "../../interface/UserInterface";

const initialState: {
    listUsers: IUsers[];
    isCreateSuccess: boolean;
    isUpdateSuccess: boolean;
    isDeleteSuccess: boolean;
} = {
    listUsers: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
};

// First, create the thunk
export const fetchListUser = createAsyncThunk(
    "users/fetchListUser", //tên của thunk
    async () => {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        return data;
    }
);

export const createUser = createAsyncThunk(
    "users/createUser", //tên của thunk
    async (payload: { userName: string; userEmail: string }, thunkAPI) => {
        const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify({
                name: payload.userName,
                email: payload.userEmail,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data && data?.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        return data;
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (
        payload: {
            userId: string | undefined;
            userName: string;
            userEmail: string;
        },
        thunkAPI
    ) => {
        const res = await fetch(
            `http://localhost:3000/users/${payload.userId}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    name: payload.userName,
                    email: payload.userEmail,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await res.json();
        if (data && data?.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        return data;
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (
        payload: {
            userId: string | undefined;
        },
        thunkAPI
    ) => {
        const res = await fetch(
            `http://localhost:3000/users/${payload.userId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await res.json();
        if (data && data?.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        return data;
    }
);

export const UserSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // những hành động đơn giản
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        },
        resetDelete(state) {
            state.isDeleteSuccess = false;
        },
    },
    extraReducers: (builder) => {
        // những hành động yêu cầu bất đồng bộ như callAPI, đợi kết quả của 1 slice khác,...
        builder.addCase(fetchListUser.fulfilled, (state, action) => {
            state.listUsers = action.payload;
        });
        builder.addCase(createUser.fulfilled, (state) => {
            // state.listUsers = [...state.listUsers, action.payload];
            state.isCreateSuccess = true;
        });
        builder.addCase(updateUser.fulfilled, (state) => {
            state.isUpdateSuccess = true;
        });
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.isDeleteSuccess = true;
        });
    },
});

export const { resetCreate, resetUpdate, resetDelete } = UserSlice.actions;

export default UserSlice.reducer;
