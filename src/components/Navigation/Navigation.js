import React, { Fragment } from "react";
import {Navbar, Nav, Container } from "react-bootstrap";
import { Link,useLocation} from "react-router-dom";


export default function Navigation() {


    const location  = useLocation()



    return (
        <Fragment>
            <Navbar bg="light" expand="lg" className="p-0">
                <Container>
                    <Navbar.Brand >BitBeen Task</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" dir="rtl">
                        <Nav className="ml-auto text-end">
                            <Nav.Link>
                                <Link className={location.pathname === "/" ? 'btn btn-link active ' : 'btn btn-link' } to={"/"}  >خانه</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className={location.pathname === "/faverates" ? 'btn btn-link active ' : 'btn btn-link' } to={"/faverates"}>مورد علاقه</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}