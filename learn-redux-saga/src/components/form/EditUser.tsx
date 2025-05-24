import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { IUsers } from "../../interface/UserInterface";
import { toast } from "react-toastify";
import {
    resetUpdate,
    updateUserPending,
} from "../../redux/user/user.saga.slide";

interface IProps {
    user?: IUsers | null;
    handleClose: () => void;
    page: number;
}

function EditUserForm({ user, handleClose, page }: IProps) {
    // setup
    const dispatch = useAppDispatch();
    const isUpdateSuccess = useAppSelector(
        (state) => state.usersSaga.isUpdateSuccess
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
        if (isUpdateSuccess === "success") {
            toast.success("Update success");
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
        const update = {
            id: user?.id,
            page,
            name: userInfo.userName,
            email: userInfo.userEmail,
        };
        dispatch(updateUserPending(update));
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
            {isUpdateSuccess !== "pending" ? (
                <Button className="mt-3" onClick={() => handleSubmit()}>
                    Update
                </Button>
            ) : (
                <Button className="mt-3" disabled>
                    Updating...
                </Button>
            )}
        </>
    );
}

export default EditUserForm;
