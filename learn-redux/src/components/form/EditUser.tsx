import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { IUsers } from "../../interface/UserInterface";
import { toast } from "react-toastify";
import { resetUpdate, updateUser } from "../../redux/user/user.slide";

interface IProps {
    user?: IUsers | null;
    handleClose: () => void;
}

function EditUserForm({ user, handleClose }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isUpdateSuccess = useAppSelector(
        (state) => state.users.isUpdateSuccess
    );

    // state
    const [userInfo, setUserInfo] = useState<{
        userName: string;
        userEmail: string;
    }>({
        userName: user ? user.name : "",
        userEmail: user ? user.email : "",
    });

    // life cycle
    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success(`Edited User}`);
            dispatch(resetUpdate());
            handleClose();
        }
    }, [isUpdateSuccess, dispatch, handleClose]);

    // function
    const handleChangeInput = (value: string, type: string) => {
        switch (type) {
            case "name":
                setUserInfo((prev) => ({ ...prev, userName: value }));
                break;
            case "email":
                setUserInfo((prev) => ({ ...prev, userEmail: value }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        if (!userInfo.userName || !userInfo.userEmail) {
            toast.warning("Information missing!");
            return;
        }
        const userData = {
            userId: user?.id,
            ...userInfo,
        };
        dispatch(updateUser(userData));
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
                    value={userInfo.userName}
                    onChange={(e) => {
                        handleChangeInput(e.target.value, "name");
                    }}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Email">
                <Form.Control
                    type="email"
                    placeholder="email@email.com"
                    value={userInfo.userEmail}
                    onChange={(e) => {
                        handleChangeInput(e.target.value, "email");
                    }}
                />
            </FloatingLabel>
            <Button className="mt-3" onClick={() => handleSubmit()}>
                Save
            </Button>
        </>
    );
}

export default EditUserForm;
