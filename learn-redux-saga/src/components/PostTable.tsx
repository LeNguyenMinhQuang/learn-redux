import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListPost } from "../redux/post/post.slide";
import type { IPost } from "../redux/post/post.slide";

import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import AppModal from "./PostModal;";

function UserTable() {
    // setup
    const dispatch = useAppDispatch();
    const postInStore = useAppSelector((state) => state.post.listPost);

    // state
    const [posts, setPosts] = useState<IPost[]>([...postInStore]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>("none");
    const [modalPost, setModalPost] = useState<IPost | null>(null);

    // running
    useEffect(() => {
        dispatch(fetchListPost());
        toast.success("GET PostList: Success!");
    }, [dispatch]);

    useEffect(() => {
        setPosts(postInStore);
    }, [postInStore]);

    // function
    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent("none");
    };

    const handleOpenModel = (type: string, user?: IPost) => {
        setShowModal(true);
        setModalContent(type);
        if (user) setModalPost(user);
    };

    return (
        <>
            <AppModal
                show={showModal}
                type={modalContent}
                handleClose={handleCloseModal}
                animation={true}
                post={modalPost}
            />
            <div className="d-flex justify-content-between mb-3">
                <h3>Table: User</h3>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleOpenModel("create");
                    }}
                >
                    Create
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <th>{post.id}</th>
                                <th>{post.title}</th>
                                <th>{post.author}</th>
                                <th>
                                    <Button
                                        variant="success"
                                        onClick={() => {
                                            handleOpenModel("view", post);
                                        }}
                                        className="me-1"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            handleOpenModel("edit", post);
                                        }}
                                        className="me-1"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            handleOpenModel("delete", post);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default UserTable;
