import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import './bootstrap-css/css/bootstrap.css';
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
  }
  return (
    <div className="App container">
      <Navbar fluid="true" collapseOnSelect>
        {/* <Navbar.Header> */}
        <Navbar.Brand>
          <Link to="/">Credit Check</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* </Navbar.Header> */}
        <Nav >
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
            : <>
              <LinkContainer to="/changePassword">
                <NavItem>Change Password</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </>
          }
        </Nav>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;