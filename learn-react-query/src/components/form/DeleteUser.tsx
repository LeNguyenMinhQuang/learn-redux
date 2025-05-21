import { toast } from "react-toastify";

import { Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../query/user.query";

interface IProps {
    userId?: string | undefined;
    handleClose: () => void;
}

function DeleteUserForm({ userId, handleClose }: IProps) {
    // setup
    const queryClient = useQueryClient();

    // mutation
    const mutation = useMutation({
        mutationFn: async (payload: { id: string | undefined }) => {
            const res = await fetch(
                `http://localhost:3000/users/${payload.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        },
        onSuccess(data, variables, context) {
            //khi success thì thực thi
            toast.success("delete user");
            handleClose();
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY.refreshUserPage(),
            }); //fetch lại cái hành động bên trong ngoặc. không cần truyền tham số thứ 2, vì thằng react query tự biết rồi
        },
    });

    const handleSubmit = () => {
        mutation.mutate({ id: userId });
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
