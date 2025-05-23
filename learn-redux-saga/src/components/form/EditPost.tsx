import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { toast } from "react-toastify";

import { resetUpdate, updatePost } from "../../redux/post/post.slide";
import type { IPost } from "../../redux/post/post.slide";

interface IProps {
    post?: IPost | null;
    handleClose: () => void;
}

function EditPostForm({ post, handleClose }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isUpdateSuccess = useAppSelector(
        (state) => state.post.isUpdateSuccess
    );

    // state
    const [postInfo, setPostInfo] = useState<{
        author: string;
        title: string;
        content: string;
    }>({
        author: post ? post.author : "",
        title: post ? post.title : "",
        content: post ? post.content : "",
    });

    // life cycle
    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success(`Edited Post}`);
            dispatch(resetUpdate());
            handleClose();
        }
    }, [isUpdateSuccess, dispatch, handleClose]);

    // function
    const handleChangeInput = (value: string, type: string) => {
        switch (type) {
            case "title":
                setPostInfo((prev) => ({ ...prev, title: value }));
                break;
            // case "author":
            //     setPostInfo((prev) => ({ ...prev, author: value }));
            //     break;
            case "content":
                setPostInfo((prev) => ({ ...prev, content: value }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        if (!postInfo.author || !postInfo.title || !postInfo.content) {
            toast.warning("Information missing!");
            return;
        }
        const postData = {
            ...postInfo,
            id: post?.id,
            author: post?.author,
        };
        dispatch(updatePost(postData));
    };

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Author"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    placeholder=""
                    value={postInfo.author}
                    readOnly
                    disabled
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    placeholder=""
                    value={postInfo.title}
                    onChange={(e) => {
                        handleChangeInput(e.target.value, "title");
                    }}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Content">
                <Form.Control
                    type="text"
                    placeholder=""
                    value={postInfo.content}
                    onChange={(e) => {
                        handleChangeInput(e.target.value, "content");
                    }}
                />
            </FloatingLabel>
            <Button className="mt-3" onClick={() => handleSubmit()}>
                Save
            </Button>
        </>
    );
}

export default EditPostForm;
