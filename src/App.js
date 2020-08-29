//import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import './bootstrap-css/css/bootstrap.css';
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";

function App() {
  //const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  //const [userName, setUserName] = useState("");
  const history = useHistory();
  useEffect(() => {
    onLoad();
  }, []);
  
  const  myContext = {
    isAuthenticated: false,
    userName: ""
    }

  async function onLoad() {
    try {
      await Auth.currentSession();
      console.log("onLoad");
      userHasAuthenticated(true);
      history.push("/")
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    //setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login")
  }
  return (
    <div className="App container">
      <Navbar bg="light" expand="lg" fluid="true" collapseOnSelect>
        <Navbar.Brand>
          <Link to="/">Telecom Credit Check</Link>
          {/* <p>{userName}</p> */}
        </Navbar.Brand>
        <Nav />
        <Nav className="justify-content-end"  >
          {isAuthenticated
            ? <>
              <Nav.Item>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </Nav.Item>
              {/* <Nav.Link href="/changePassword">Change Password</Nav.Link> */}
              <Link to="/changePassword">Change Password</Link>
              <Link to="/verifyEmail">Verify Email</Link>
              {/*  <Nav.Link href="/verifyEmail">Verify Email</Nav.Link> */}
            </>
            : <div></div>}
        </Nav>
      </Navbar>
      <AppContext.Provider value={ myContext}>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;