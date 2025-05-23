import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeMode } from "../redux/app/app.slice";
import { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";

function Header() {
    // setup
    const mode = useAppSelector((state) => state.app.mode);
    const dispatch = useAppDispatch();

    // life cycle
    useEffect(() => {
        const body = document.querySelector("body");
        body?.setAttribute("data-bs-theme", mode);
    }, [mode]);

    // function
    const handleChangeMode = (value: boolean) => {
        dispatch(changeMode(value === false ? "light" : "dark"));
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Learn Redux Saga</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end ">
                    <Form.Check
                        onChange={(e) => handleChangeMode(e.target.checked)}
                        type="switch"
                        id="custom-switch"
                        label={
                            mode == "light" ? (
                                <Navbar.Text>Light mode</Navbar.Text>
                            ) : (
                                <Navbar.Text>Dark mode</Navbar.Text>
                            )
                        }
                        defaultChecked={mode === "light" ? false : true}
                    />
                    <NavDropdown
                        title="Settings"
                        id="navbarScrollingDropdown"
                        className="ms-3"
                    >
                        <NavDropdown.Item href="/user">
                            User Page
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/logout">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
