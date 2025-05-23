import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListUser } from "../redux/user/user.slide";
import type { IUsers } from "../interface/UserInterface";

import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import AppModal from "./Modal";

function UserTable() {
    // setup
    const dispatch = useAppDispatch();
    const usersInStore = useAppSelector((state) => state.users.listUsers);

    // state
    const [users, setUsers] = useState<IUsers[]>([...usersInStore]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>("none");
    const [modalUser, setModalUser] = useState<IUsers | null>(null);

    // running
    useEffect(() => {
        dispatch(fetchListUser());
        toast.success("GET UserList: Success!");
    }, [dispatch]);

    useEffect(() => {
        setUsers(usersInStore);
    }, [usersInStore]);

    // function
    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent("none");
    };

    const handleOpenModel = (type: string, user?: IUsers) => {
        setShowModal(true);
        setModalContent(type);
        if (user) setModalUser(user);
    };

    return (
        <>
            <AppModal
                show={showModal}
                type={modalContent}
                handleClose={handleCloseModal}
                animation={true}
                user={modalUser}
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>
                                    <Button
                                        variant="success"
                                        onClick={() => {
                                            handleOpenModel("view", user);
                                        }}
                                        className="me-1"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            handleOpenModel("edit", user);
                                        }}
                                        className="me-1"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            handleOpenModel("delete", user);
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
