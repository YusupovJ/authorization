import Link from "next/link";
import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

const Header: React.FC = () => {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand>
                    <Link href="?">Authorization</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <Link href="/">
                            <Nav.Link as="button">Home</Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex">
                        <Button variant="outline-info">
                            <Link href="/login">Login</Link>
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
