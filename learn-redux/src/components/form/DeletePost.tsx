import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetDelete, deletePost } from "../../redux/post/post.slide";

interface IProps {
    postId?: string | undefined;
    handleClose: () => void;
}

function DeletePostForm({ postId, handleClose }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector(
        (state) => state.post.isDeleteSuccess
    );

    // state

    // Life cycle
    useEffect(() => {
        if (isDeleteSuccess === true) {
            toast.success("Deleted Post");
            dispatch(resetDelete());
            handleClose();
        }
    }, [isDeleteSuccess, dispatch, handleClose]);

    const handleSubmit = () => {
        dispatch(deletePost({ postId }));
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

export default DeletePostForm;
