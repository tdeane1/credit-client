import { LinkContainer } from "react-router-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import './bootstrap-css/css/bootstrap.css';
import Routes from "./Routes";

function App() {
  return (
    <div className="App container">
      <Navbar fluid="true" collapseOnSelect>
        {/* <Navbar.Header> */}
        <Navbar.Brand>
          <Link to="/">Credit Check</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* </Navbar.Header> */}
        <Nav pullRight>
          <LinkContainer to="/signup">
            <NavItem>Signup</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;