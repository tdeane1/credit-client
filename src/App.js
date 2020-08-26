import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import './bootstrap-css/css/bootstrap.css';
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      history.push("/")
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
    history.push("/login")
  }
  return (
    <div className="App container">
      <Navbar bg="light" expand="lg" fluid="true" collapseOnSelect>
        {/* <Navbar.Header> */}
        <Navbar.Brand>
          <Link to="/">Credit Check</Link>
        </Navbar.Brand>
        <Nav/>
        {/* </Navbar.Header> */}
        <Nav className="justify-content-end"  >
          {isAuthenticated
            ? <>
                <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
                <Nav.Link href="/changePassword">Change Password</Nav.Link>
                <Nav.Link href="/verifyEmail">Verify Email</Nav.Link>
              </>
            : <Nav.Link href="/login">Login</Nav.Link>

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