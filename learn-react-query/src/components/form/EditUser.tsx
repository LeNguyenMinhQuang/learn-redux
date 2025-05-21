import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { toast } from "react-toastify";

import type { IUser } from "../UserTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../query/user.query";

interface IProps {
    user?: IUser | null;
    handleClose: () => void;
}

function EditUserForm({ user, handleClose }: IProps) {
    // setup
    const queryClient = useQueryClient();

    // state
    const [userInfo, setUserInfo] = useState<{
        userName: string;
        userEmail: string;
    }>({
        userName: user ? user.name : "",
        userEmail: user ? user.email : "",
    });

    // mutation
    const mutation = useMutation({
        mutationFn: async (payload: {
            id: string | undefined;
            userName: string;
            userEmail: string;
        }) => {
            const res = await fetch(
                `http://localhost:3000/users/${payload.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        email: payload.userEmail,
                        name: payload.userName,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        },
        onSuccess(data, variables, context) {
            //khi success thì thực thi
            toast.success("updated user");
            handleClose();
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY.refreshUserPage(),
            }); //fetch lại cái hành động bên trong ngoặc. không cần truyền tham số thứ 2, vì thằng react query tự biết rồi
        },
    });

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
            id: user?.id,
            ...userInfo,
        };

        mutation.mutate(userData);
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
