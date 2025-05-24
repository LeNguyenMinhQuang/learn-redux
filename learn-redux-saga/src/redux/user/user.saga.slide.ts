import {
    createAction,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUsers } from "../../interface/UserInterface";

const initialState: {
    listUsers: IUsers[];
    totalUsers: number;
    isLoading: boolean;
    isError: boolean;
    message: string;

    isCreateSuccess: "idle" | "pending" | "success" | "failed";
    isUpdateSuccess: "idle" | "pending" | "success" | "failed";
    isDeleteSuccess: "idle" | "pending" | "success" | "failed";
} = {
    listUsers: [],
    totalUsers: 0,
    isLoading: false,
    isError: false,
    message: "",

    isCreateSuccess: "idle",
    isUpdateSuccess: "idle",
    isDeleteSuccess: "idle",
};

// get
export const fetchAllUsersSagaPending = createAction<{ page: number }>(
    "fetchAllUsersSagaPending"
);
export const fetchAllUsersSagaSuccess = createAction<{
    listUser: IUsers[];
    totalUsers: number;
}>("fetchAllUsersSagaSuccess");
export const fetchAllUsersSagaFailed = createAction("fetchAllUsersSagaFailed");

// create
export const createUserPending = createAction<{
    userName: string;
    userEmail: string;
    page: number;
}>("createUserPending");
export const createUserSuccess = createAction("createUserSuccess");
export const createUserFailed = createAction("createUserFailed");

// update
export const updateUserPending = createAction<{
    id: string | undefined;
    name: string;
    email: string;
    page: number;
}>("updateUserPending");
export const updateUserSuccess = createAction("updateUserSuccess");
export const updateUserFailed = createAction("updateUserFailed");

// create
export const deleteUserPending = createAction<{
    id: string | undefined;
    page: number;
}>("deleteUserPending");
export const deleteUserSuccess = createAction("deleteUserSuccess");
export const deleteUserFailed = createAction("deleteUserFailed");

export const UserSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // những hành động đơn giản
        resetCreate(state) {
            state.isCreateSuccess = "idle";
            state.message = "";
        },
        resetUpdate(state) {
            state.isUpdateSuccess = "idle";
            state.message = "";
        },
        resetDelete(state) {
            state.isDeleteSuccess = "idle";
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersSagaPending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "";
                state.totalUsers = 0;
            })
            .addCase(
                fetchAllUsersSagaSuccess,
                (
                    state,
                    action: PayloadAction<{
                        listUser: IUsers[];
                        totalUsers: number;
                    }>
                ) => {
                    state.isLoading = false;
                    state.listUsers = [...action.payload.listUser];
                    state.totalUsers = action.payload.totalUsers;
                }
            )
            .addCase(fetchAllUsersSagaFailed, (state) => {
                state.isError = true;
                state.isLoading = false;
                state.message = "Cannot get All User";
            })
            .addCase(
                createUserPending,
                (
                    state,
                    action: PayloadAction<{
                        userName: string;
                        userEmail: string;
                    }>
                ) => {
                    state.isCreateSuccess = "pending";
                    state.message = `creating user: ${action.payload.userName} - email: ${action.payload.userEmail}`;
                }
            )
            .addCase(createUserSuccess, (state) => {
                state.isCreateSuccess = "success";
            })
            .addCase(createUserFailed, (state) => {
                state.isCreateSuccess = "failed";
                state.message = "Created Failed";
            })
            .addCase(
                updateUserPending,
                (
                    state,
                    action: PayloadAction<{
                        id: string | undefined;
                        name: string;
                        email: string;
                        page: number;
                    }>
                ) => {
                    state.isUpdateSuccess = "pending";
                    state.message = `update user: ${action.payload.id}`;
                }
            )
            .addCase(updateUserSuccess, (state) => {
                state.isUpdateSuccess = "success";
            })
            .addCase(updateUserFailed, (state) => {
                state.isUpdateSuccess = "failed";
                state.message = "Update Failed";
            })
            .addCase(
                deleteUserPending,
                (
                    state,
                    action: PayloadAction<{
                        id: string | undefined;
                        page: number;
                    }>
                ) => {
                    state.isDeleteSuccess = "pending";
                    state.message = `delete user: ${action.payload.id}`;
                }
            )
            .addCase(deleteUserSuccess, (state) => {
                state.isDeleteSuccess = "success";
            })
            .addCase(deleteUserFailed, (state) => {
                state.isDeleteSuccess = "failed";
                state.message = "Delete Failed";
            });
    },
});

export const { resetCreate, resetUpdate, resetDelete } = UserSlice.actions;

export default UserSlice.reducer;
