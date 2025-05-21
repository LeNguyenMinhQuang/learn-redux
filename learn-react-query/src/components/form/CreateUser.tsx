import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../query/user.query";

interface IProps {
    handleClose: () => void;
}

function CreateUserForm({ handleClose }: IProps) {
    // setup
    const queryClient = useQueryClient();

    // state
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    // mutation - create, update, remove
    const mutation = useMutation({
        mutationFn: async (payload: {
            userName: string;
            userEmail: string;
        }) => {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                body: JSON.stringify({
                    email: payload.userEmail,
                    name: payload.userName,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        },
        onSuccess(data, variables, context) {
            //khi success thì thực thi
            toast.success("created user");
            setUserName("");
            setUserEmail("");
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
                setUserName(value);
                break;
            case "email":
                setUserEmail(value);
                break;
        }
    };

    const handleSubmit = () => {
        if (!userName || !userEmail) {
            toast.warn("missing data");
        }
        mutation.mutate({ userName, userEmail });
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
            {mutation.isPending ? (
                <Button onClick={() => {}} className="mt-3" disabled>
                    Creating...
                </Button>
            ) : (
                <Button onClick={() => handleSubmit()} className="mt-3">
                    Create
                </Button>
            )}
        </>
    );
}

export default CreateUserForm;
