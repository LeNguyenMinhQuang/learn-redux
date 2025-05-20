import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUser, resetCreate } from "../../redux/user/user.slide";

interface IProps {
    handleClose: () => void;
}

function CreateUserForm({ handleClose }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isCreateSucess = useAppSelector(
        (state) => state.users.isCreateSuccess
    );

    // state
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    // Life cycle
    useEffect(() => {
        if (isCreateSucess === true) {
            toast.success("Created User");
            setUserName("");
            setUserEmail("");
            dispatch(resetCreate());
            handleClose();
        }
    }, [isCreateSucess, dispatch, handleClose]);

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
        dispatch(createUser({ userName, userEmail }));
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
            <Button onClick={() => handleSubmit()} className="mt-3">
                Create
            </Button>
        </>
    );
}

export default CreateUserForm;
