import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigationbar = ({ auth, onClick }) => (
  <Navbar
    bg="dark"
    variant="dark"
    expand="sm"
    className="mb-3"
    style={{ minHeight: '4rem' }}
  >
    <Link to="/vessels">
      <Navbar.Brand>
        <img
          src="https://www.portsmouth-port.co.uk/uploads/operators/PIP-Blue.png"
          style={{ height: 60, width: 120 }}
          className="d-inline-block align-top"
          alt=""
        />
        <span id="navbar_msg">Portsmouth International Port - Berth Auction</span>
      </Navbar.Brand>
    </Link>
    <Nav className="ml-auto">
      {auth ? (
        <Link to="/logout">
          <Button variant="outline-light" className="mr-sm-2" onClick={onClick}>
            Logout
          </Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button variant="outline-light" className="mr-sm-2">
            Login
          </Button>
        </Link>
      )}
    </Nav>
  </Navbar>
);

Navigationbar.propTypes = {
  auth: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Navigationbar;
