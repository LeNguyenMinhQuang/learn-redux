import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IPost {
    id: string;
    author: string;
    title: string;
    content: string;
}

const initialState: {
    listPost: IPost[];
    isCreateSuccess: boolean;
    isUpdateSuccess: boolean;
    isDeleteSuccess: boolean;
} = {
    listPost: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
};

// First, create the thunk
export const fetchListPost = createAsyncThunk(
    "posts/fetchListPost", //tên của thunk
    async () => {
        const res = await fetch("http://localhost:3000/blogs");
        const data = await res.json();
        return data;
    }
);

export const createPost = createAsyncThunk(
    "posts/createPost", //tên của thunk
    async (
        payload: { author: string; title: string; content: string },
        thunkAPI
    ) => {
        const res = await fetch("http://localhost:3000/blogs", {
            method: "POST",
            body: JSON.stringify({
                author: payload.author,
                title: payload.title,
                content: payload.content,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data && data?.id) {
            thunkAPI.dispatch(fetchListPost());
        }
        return data;
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (
        payload: {
            id: string | undefined;
            author: string | undefined;
            title: string;
            content: string;
        },
        thunkAPI
    ) => {
        const res = await fetch(`http://localhost:3000/blogs/${payload.id}`, {
            method: "PUT",
            body: JSON.stringify({
                author: payload.author,
                title: payload.title,
                content: payload.content,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data && data?.id) {
            thunkAPI.dispatch(fetchListPost());
        }
        return data;
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (
        payload: {
            postId: string | undefined;
        },
        thunkAPI
    ) => {
        const res = await fetch(
            `http://localhost:3000/blogs/${payload.postId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await res.json();
        if (data && data?.id) {
            thunkAPI.dispatch(fetchListPost());
        }
        return data;
    }
);

export const PostSlice = createSlice({
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
        builder.addCase(fetchListPost.fulfilled, (state, action) => {
            state.listPost = action.payload;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            // state.listUsers = [...state.listUsers, action.payload];
            state.isCreateSuccess = true;
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.isUpdateSuccess = true;
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.isDeleteSuccess = true;
        });
    },
});

export const { resetCreate, resetUpdate, resetDelete } = PostSlice.actions;

export default PostSlice.reducer;
