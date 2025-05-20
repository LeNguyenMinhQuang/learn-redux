import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetDelete, deleteUser } from "../../redux/user/user.slide";

interface IProps {
    userId?: string | undefined;
    handleClose: () => void;
}

function DeleteUserForm({ userId, handleClose }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector(
        (state) => state.users.isDeleteSuccess
    );

    // state

    // Life cycle
    useEffect(() => {
        if (isDeleteSuccess === true) {
            toast.success("Deleted User");
            dispatch(resetDelete());
            handleClose();
        }
    }, [isDeleteSuccess, dispatch, handleClose]);

    const handleSubmit = () => {
        dispatch(deleteUser({ userId }));
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
