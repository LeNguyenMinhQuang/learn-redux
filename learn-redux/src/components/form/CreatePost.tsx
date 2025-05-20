import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createPost, resetCreate } from "../../redux/post/post.slide";

interface IProps {
    handleClose: () => void;
}

function CreatePostForm({ handleClose }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isCreateSucess = useAppSelector(
        (state) => state.post.isCreateSuccess
    );

    // state
    const [author, setAuthor] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    // Life cycle
    useEffect(() => {
        if (isCreateSucess === true) {
            toast.success("Created Post");
            setAuthor("");
            setTitle("");
            setContent("");
            dispatch(resetCreate());
            handleClose();
        }
    }, [isCreateSucess, dispatch, handleClose]);

    // function
    const handleChangeInput = (value: string, type: string) => {
        switch (type) {
            case "author":
                setAuthor(value);
                break;
            case "title":
                setTitle(value);
                break;
            case "content":
                setContent(value);
        }
    };

    const handleSubmit = () => {
        if (!author || !title || !content) {
            toast.warning("Information missing!");
            return;
        }
        dispatch(createPost({ author, title, content }));
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
                    value={author}
                    onChange={(e) =>
                        handleChangeInput(e.target.value, "author")
                    }
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
                    value={title}
                    onChange={(e) => handleChangeInput(e.target.value, "title")}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Content">
                <Form.Control
                    type="text"
                    placeholder=""
                    value={content}
                    onChange={(e) =>
                        handleChangeInput(e.target.value, "content")
                    }
                />
            </FloatingLabel>
            <Button onClick={() => handleSubmit()} className="mt-3">
                Create
            </Button>
        </>
    );
}

export default CreatePostForm;
