import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavDropdown,
  Glyphicon,
  MenuItem,
} from 'react-bootstrap';

import Logout from '../Logout/Logout';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import ONA from '../../connectors/Ona/ona';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(() => {
      this.props.toggle();
    });
  }

  render() {
    const { userInfo } = this.props.global;
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ingest</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown
              eventKey={3}
              title={
                <Glyphicon glyph="user" />
              }
              id="basic-nav-dropdown"
            >
              <MenuItem eventKey={3.1}>{`Welcome, ${userInfo.name}`}</MenuItem>
              <MenuItem divider />
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
