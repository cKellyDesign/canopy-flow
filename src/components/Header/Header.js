import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavDropdown,
  Glyphicon,
} from 'react-bootstrap';

import Logout from './../Logout/Logout';
import { mapStateToProps } from './../../helpers/mapStateToProps';
import ONA from './../../connectors/Ona/ona';

class Header extends Component {
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Ingest</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={3} title={
              <Glyphicon glyph="user" />
            } id="basic-nav-dropdown">
              <Logout
                onLogoutClick={() => { ONA.Oauth2.defaultDeAuthZ(this.props.dispatch); }}
              />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps)(Header);
