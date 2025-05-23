import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
    return (
        <Container>
            <Header />
            <Outlet />
        </Container>
    );
}

export default App;
