import Table from "react-bootstrap/Table";

import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useRef, useState } from "react";

import UserPagination from "./pagination/User.pagination";
import AppModal from "./Modal";
import { useQueryFetchAllUser } from "../query/user.query";

export interface IUser {
    id: string;
    name: string;
    email: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PopoverRight = forwardRef((props: any, ref: any) => {
    const { userId } = props;
    const {
        isPending,
        error,
        data: user,
    } = useQuery({
        queryKey: ["fetchAUser", userId],
        queryFn: async (): Promise<IUser> => {
            const res = await fetch(`http://localhost:3000/users/${userId}`);
            const data = await res.json();
            console.log(data);
            return data;
        },
    });
    return (
        <Popover ref={ref} {...props}>
            <Popover.Header as="h3">Detail User</Popover.Header>
            {isPending && (
                <Popover.Body>
                    <p>Loading...</p>
                </Popover.Body>
            )}
            {error && (
                <Popover.Body>
                    <p>{"Error" + error.message}</p>
                </Popover.Body>
            )}
            {user && (
                <Popover.Body>
                    <div className="">ID = {userId}</div>
                    <div className="">Name = {user?.name || "?"}</div>
                    <div className="">Email = {user?.email || "?"}</div>
                </Popover.Body>
            )}
        </Popover>
    );
});

function UserTable() {
    // state & ref
    const ref = useRef(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>("none");
    const [modalUser, setModalUser] = useState<IUser | null>(null);

    // function
    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent("none");
    };

    const handleOpenModel = (type: string, user?: IUser) => {
        setShowModal(true);
        setModalContent(type);
        if (user) setModalUser(user);
    };

    // query
    const { isPending, error, data } = useQueryFetchAllUser(page);
    const users = data?.users;
    const total = data?.total || 1;

    useEffect(() => {
        setTotalPages(Math.ceil(total / 5));
    }, [total]);
    if (isPending) return "Loading...";
    if (error) return "Error" + error.message;

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
                    {users?.map((user: IUser) => {
                        return (
                            <tr key={user.id}>
                                <OverlayTrigger
                                    trigger="click"
                                    placement="right"
                                    rootClose
                                    overlay={
                                        <PopoverRight
                                            userId={user.id}
                                            ref={ref}
                                        />
                                    }
                                >
                                    <td>{user.id}</td>
                                </OverlayTrigger>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => {}}
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
                                </td>
                            </tr>
                        );
                    })}
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

export default UserTable;
