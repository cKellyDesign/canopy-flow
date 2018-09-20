import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;
    return (
      <MenuItem eventKey={3.1} onClick={() => onLogoutClick()}>Logout</MenuItem>
    );
  }
}

export default Logout;
