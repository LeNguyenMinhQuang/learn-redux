import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { IUsers } from "../interface/UserInterface";

import { Button } from "react-bootstrap";

import AppModal from "./Modal";
import { fetchAllUsersSagaPending } from "../redux/user/user.saga.slide";
import UserPagination from "./pagination/User.pagination";

function UserTableSaga() {
    // setup
    const dispatch = useAppDispatch();
    const {
        listUsers: usersInStore,
        totalUsers,
        isLoading,
    } = useAppSelector((state) => state.usersSaga);

    // state
    const [users, setUsers] = useState<IUsers[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>("none");
    const [modalUser, setModalUser] = useState<IUsers | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    // running
    useEffect(() => {
        dispatch(fetchAllUsersSagaPending({ page: page }));
    }, [page, dispatch]);

    useEffect(() => {
        setUsers([...usersInStore]);
        setTotalPages(Math.ceil(totalUsers / 4));
    }, [usersInStore, totalUsers]);

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
                page={page}
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
                    {!isLoading &&
                        users?.map((user) => {
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
                    {isLoading && (
                        <tr>
                            <td align="center" colSpan={4}>
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <UserPagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
        </>
    );
}

export default UserTableSaga;
