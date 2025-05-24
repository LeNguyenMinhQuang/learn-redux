import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    deleteUserPending,
    resetDelete,
} from "../../redux/user/user.saga.slide";

interface IProps {
    userId?: string | undefined;
    handleClose: () => void;
    page: number;
}

function DeleteUserForm({ userId, handleClose, page }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector(
        (state) => state.usersSaga.isDeleteSuccess
    );

    // state

    // Life cycle
    useEffect(() => {
        if (isDeleteSuccess === "success") {
            toast.success("Deleted User");
            dispatch(resetDelete());
            handleClose();
        }
    }, [isDeleteSuccess, dispatch, handleClose]);

    const handleSubmit = () => {
        dispatch(deleteUserPending({ id: userId, page }));
    };

    return (
        <>
            <Button
                variant="danger"
                onClick={() => handleSubmit()}
                className="mt-3"
            >
                Delete
            </Button>
        </>
    );
}

export default DeleteUserForm;
