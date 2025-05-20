import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { Container } from "react-bootstrap";

function App() {
    return (
        <Container>
            <Header />
            <Tabs />
        </Container>
    );
}

export default App;
