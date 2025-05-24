import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    createUserPending,
    resetCreate,
} from "../../redux/user/user.saga.slide";

interface IProps {
    handleClose: () => void;
    page: number;
}

function CreateUserForm({ handleClose, page }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const { isCreateSuccess } = useAppSelector((state) => state.usersSaga);

    // state
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    // Life cycle
    useEffect(() => {
        if (isCreateSuccess === "success") {
            setUserName("");
            setUserEmail("");
            dispatch(resetCreate());
            toast.success("User created");
            handleClose();
        }
        if (isCreateSuccess === "failed") {
            setUserName("");
            setUserEmail("");
            dispatch(resetCreate());
            toast.error("Error");
            handleClose();
        }
    }, [isCreateSuccess, dispatch, handleClose]);

    // function
    const handleChangeInput = (value: string, type: string) => {
        switch (type) {
            case "name":
                setUserName(value);
                break;
            case "email":
                setUserEmail(value);
        }
    };

    const handleSubmit = () => {
        if (!userName || !userEmail) {
            toast.warning("Information missing!");
            return;
        }
        dispatch(createUserPending({ userName, userEmail, page }));
    };

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    placeholder="Nguyen Van A"
                    value={userName}
                    onChange={(e) => handleChangeInput(e.target.value, "name")}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Email">
                <Form.Control
                    type="email"
                    placeholder="email@email.com"
                    value={userEmail}
                    onChange={(e) => handleChangeInput(e.target.value, "email")}
                />
            </FloatingLabel>
            {isCreateSuccess !== "pending" ? (
                <Button onClick={() => handleSubmit()} className="mt-3">
                    Create
                </Button>
            ) : (
                <Button className="mt-3" disabled>
                    Creating...
                </Button>
            )}
        </>
    );
}

export default CreateUserForm;
