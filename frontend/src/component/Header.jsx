import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand variant={"light"} className="text-light">
            {" "}
            MERN Notes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/MyNotes" className="text-white">
                MyNotes
              </Link>
            </Nav>
            <Nav className="ml-auto" navbarScroll>
              {/* <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  style={{ maxWidth: "800px" }}
                />
              </Form> */}
            </Nav>
            <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
              <Link to="/ProfileUpdate" className="text-white">
                {localStorage.getItem("userInfo") !== null
                  ? JSON.parse(localStorage.getItem("userInfo")).name
                  : "profile"}
              </Link>

              <Link
                to="/"
                className="text-white mx-3"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
