import Modal from "react-bootstrap/Modal";

import type { IPost } from "../redux/post/post.slide";
import CreatePostForm from "./form/CreatePost";
import EditPostForm from "./form/EditPost";
import DeletePostForm from "./form/DeletePost";

interface IAppModal {
    show: boolean;
    type: string;
    handleClose: () => void;
    animation: boolean;
    post?: IPost | null;
}

function AppModal({ show, type, handleClose, animation, post }: IAppModal) {
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
                            Create Post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreatePostForm handleClose={handleClose} />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </>
            )}

            {type == "view" && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Content
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{post?.content}</Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </>
            )}

            {type == "edit" && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditPostForm post={post} handleClose={handleClose} />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </>
            )}
            {type == "delete" && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Delete Post: {post?.title}?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeletePostForm
                            postId={post?.id}
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
