import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";

export function MyNavbar({
  theme = "dark",
  brand = "default",
  // navLink1 = "navLink1",
  // navLink2 = "navLink2",
  navLink3 = "navLink3",
  navLink4 = "navLink4",
  selectRoleDropdowntTitle = "Select Role",
  select_Role_dropDownAction_1 = "Creator",
  select_Role_dropDownAction_2 = "Contributor",
  currentUser,
  dropdownTitle = "dropdownTitle",
  dropDownAction_1 = "dropDownAction_1",
  dropDownAction_2 = "dropDownAction_2",
  dropDownAction_3 = " dropDownAction_3",
  dropDownAction_4 = " dropDownAction_4",
  showWalletDropdown = false,
  isCreatorLoggedIn = false,
  onLoginAsCreator = () => {},
}) {
  const navigate = useNavigate();
  const account = useActiveAccount();

  const handleBrandClick = () => {
    if (account) {
      // User is signed in, go to creator home
      navigate("/creator");
    } else {
      // User is not signed in, go to landing page
      navigate("/");
    }
  };

  return (
  
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav"
      // bg={theme}
      variant={theme}
      data-bs-theme={theme}
    >
      <Container>
        <Navbar.Brand onClick={handleBrandClick} style={{ cursor: "pointer" }}>{brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="navLink_1_Page" onClick={() => navigate("")}>
              {navLink1}
            </Nav.Link>
            <Nav.Link href="navLink_2_Page">{navLink2}</Nav.Link> */}
            <Nav.Link href="#navLink_3_Page">{navLink3} </Nav.Link>
            <Nav.Link href="navLink_4_Page">{navLink4} </Nav.Link>
          </Nav>

          <Nav>
            {account && !isCreatorLoggedIn ? (
              <Button 
                variant="outline-light" 
                onClick={onLoginAsCreator}
                style={{ marginRight: "10px" }}
              >
                Login as Creator
              </Button>
            ) : null}

            {isCreatorLoggedIn && (
              <NavDropdown title={dropdownTitle} id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() =>
                    navigate("/myProfile", { state: { user: currentUser } })
                  }
                >
                  {dropDownAction_1}
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">
                  {dropDownAction_2}
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.3">
                  {" "}
                  {dropDownAction_3}
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => navigate("/earningStats")}>
                  {" "}
                  {dropDownAction_4}
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action/3.5">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
