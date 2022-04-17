import React, { Fragment } from "react";
import {Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Navigation() {


    return (
        <Fragment>
            <Navbar bg="light" expand="lg" dir="rtl">
                <Container>
                    {/* <Navbar.Brand >Navbar</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto text-center">
                            <Nav.Link>
                                <Link className="btn btn-link" to={"/"}>خانه</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="btn btn-link" to={"/markets/faverates"}>مورد علاقه</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}