import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            WhatSupplier
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>

              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/home'>
                    HOME
                  </Nav.Link>
                  <Nav.Link as={Link} to='/suppliers'>
                    SUPPLIERS
                  </Nav.Link>
                  <Nav.Link as={Link} to='/inventory'>
                    INVENTORY
                  </Nav.Link>
                  <Nav.Link as={Link} to='/production'>
                    PRODUCTION
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>
                    LOGOUT
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to='/login'>
                    LOGIN
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    SIGN UP
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
