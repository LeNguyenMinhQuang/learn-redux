import Modal from "react-bootstrap/Modal";

import type { IUser } from "./UserTable";
import CreateUserForm from "./form/CreateUser";
import EditUserForm from "./form/EditUser";
import DeleteUserForm from "./form/DeleteUser";

interface IAppModal {
    show: boolean;
    type: string;
    handleClose: () => void;
    animation: boolean;
    user?: IUser | null;
}

function AppModal({ show, type, handleClose, animation, user }: IAppModal) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            animation={animation}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {type == "create" && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateUserForm handleClose={handleClose} />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </>
            )}
            {type == "edit" && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit User Information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditUserForm user={user} handleClose={handleClose} />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </>
            )}
            {type == "delete" && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Delete User: {user?.id} - {user?.name}?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteUserForm
                            userId={user?.id}
                            handleClose={handleClose}
                        />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </>
            )}
        </Modal>
    );
}

export default AppModal;
