import { all, call, fork, put, take } from "redux-saga/effects";
import {
    createUserFailed,
    createUserPending,
    createUserSuccess,
    deleteUserFailed,
    deleteUserPending,
    deleteUserSuccess,
    fetchAllUsersSagaFailed,
    fetchAllUsersSagaPending,
    fetchAllUsersSagaSuccess,
    updateUserFailed,
    updateUserPending,
    updateUserSuccess,
} from "../user/user.saga.slide";
import type { IUsers } from "../../interface/UserInterface";
import type { PayloadAction } from "@reduxjs/toolkit";

// api
const GetAllUserApi = async (page: number) => {
    const res = await fetch(
        `http://localhost:3000/users?_page=${page}&_limit=4`
    );
    const _ = res.headers.get("X-Total-Count");
    const total = _ ? parseInt(_) : 0;
    const data = await res.json();
    return { listUser: data, total };
};

const CreateUserApi = async (payload: {
    userName: string;
    userEmail: string;
}) => {
    await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
            email: payload.userEmail,
            name: payload.userName,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const UpdateUserApi = async (payload: {
    id: string;
    name: string;
    email: string;
}) => {
    await fetch(`http://localhost:3000/users/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
            email: payload.email,
            name: payload.name,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const DeleteUserApi = async (payload: { id: string }) => {
    await fetch(`http://localhost:3000/users/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// worker
function* handleGetAllUsers(payload: { page: number }) {
    try {
        const response: { listUser: IUsers[]; total: number } = yield call(
            GetAllUserApi,
            payload.page
        );

        yield put(
            fetchAllUsersSagaSuccess({
                listUser: response.listUser,
                totalUsers: response.total,
            })
        );
    } catch (error) {
        yield put(fetchAllUsersSagaFailed());
        console.log(error);
    }
}

function* handleCreateUser(payload: {
    userName: string;
    userEmail: string;
    page: number;
}) {
    try {
        yield call(CreateUserApi, payload);
        yield put(createUserSuccess());
        yield put(fetchAllUsersSagaPending({ page: payload.page }));
    } catch (error) {
        yield put(createUserFailed());
        console.log(error);
    }
}

function* handleUpdateUser(payload: {
    name: string;
    email: string;
    page: number;
    id: string;
}) {
    try {
        yield call(UpdateUserApi, payload);
        yield put(updateUserSuccess());
        yield put(fetchAllUsersSagaPending({ page: payload.page }));
    } catch (error) {
        yield put(updateUserFailed());
        console.log(error);
    }
}

function* handleDeleteUser(payload: { page: number; id: string }) {
    try {
        yield call(DeleteUserApi, payload);
        yield put(deleteUserSuccess());
        yield put(fetchAllUsersSagaPending({ page: payload.page }));
    } catch (error) {
        yield put(deleteUserFailed());
        console.log(error);
    }
}

// watcher
function* watcherGetAllUser() {
    while (true) {
        const action: PayloadAction<{ page: number }> = yield take(
            fetchAllUsersSagaPending
        );
        yield fork(handleGetAllUsers, action.payload);
    }
}

function* watcherCreateUser() {
    while (true) {
        const action: PayloadAction<{
            userName: string;
            userEmail: string;
            page: number;
        }> = yield take(createUserPending);
        yield fork(handleCreateUser, action.payload);
    }
}

function* watcherUpdateUser() {
    while (true) {
        const action: PayloadAction<{
            name: string;
            email: string;
            page: number;
            id: string;
        }> = yield take(updateUserPending);
        yield fork(handleUpdateUser, action.payload);
    }
}

function* watcherDeleteUser() {
    while (true) {
        const action: PayloadAction<{
            page: number;
            id: string;
        }> = yield take(deleteUserPending);
        yield fork(handleDeleteUser, action.payload);
    }
}

function* UserSaga() {
    yield all([
        fork(watcherGetAllUser),
        fork(watcherCreateUser),
        fork(watcherUpdateUser),
        fork(watcherDeleteUser),
    ]);
}

export default UserSaga;
